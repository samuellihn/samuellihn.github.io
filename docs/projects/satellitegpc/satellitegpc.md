---
title: Generative Predictive Control for Satellite Locomanipulation
date: 2026-09-09
status: Completed
thumbnail: approach-phase.png
featured: true
carousel:
  - src: mppi-baseline.mp4
    caption: MPPI baseline. 512 rollout samples, 36 ms per control cycle.
  - src: pac-gpc.mp4
    caption: PAC-GPC. The flow-matching policy warm-starts a 16-sample controller, holding the same success rate at 8.9 ms per cycle.
  - src: gpc-openloop.mp4
    caption: The policy running open loop. 40x faster than the baseline and visibly smooth, but it never lands the grasp.
description: Distilling sampling-based MPC into a flow-matching policy, cutting satellite planning latency 4x.
---

Autonomous on-orbit servicing needs a manipulator, but microgravity offers no reaction body: every joint torque pushes the satellite base around through the coupled mass matrix, so the arm and the base have to be planned as one system. Sampling-based predictive control handles those nonlinear dynamics without gradients, at the cost of thousands of parallel dynamics rollouts every control cycle — expensive for a power-limited spacecraft. This project distills an expensive MPPI expert into a flow-matching policy offline, then uses that policy to warm-start a very small online sampling controller.

# The Task

A 7-DOF planar free-flyer — a 3-DOF thruster-actuated base and a 4-DOF torque-controlled arm — navigates a static maze and picks up a box, simulated with full dynamics in MuJoCo MJX. A grasp triggers when the end effector is within 2 cm of the grasp point and aligned with the box surface normal, after which the payload rigidly attaches and the controller has to absorb its added inertia. Getting the MPPI expert to grasp rather than avoid required scaling the box's collision penalty down as the end effector closes in; without that gating the target is purely repulsive and the arm can never enter the grasp zone. Actuator noise, 10% on the thrusters and 5% on the joints, is injected into the plant but hidden from the planner's rollouts.

![The robot in the grasped phase, rigidly attached to the payload](/projects/satellitegpc/media/grasped-phase.png)

# Distilling the Expert

The policy is a 3-layer, 512-wide MLP trained with a flow-matching objective to map Gaussian noise onto the expert's optimal control sequences. Its 15-dimensional observation includes a discrete phase flag, which lets a single policy cover both the approach and the heavier post-grasp regime. An MLP beats a transformer backbone here because the state is a dense, low-dimensional vector with no spatial structure to exploit, and because self-attention overhead defeats the purpose when low latency is the entire goal. Inference runs in 1–4 ms.

# Results

Using the policy to warm-start a 16-sample predictive sampling controller (PAC-GPC) matches the MPPI baseline's 100% grasp success and time-to-grasp while cutting mean loop latency from 36 ms to 8.9 ms, and reduces control jitter from 0.93 to 0.29.

![Inference latency per control cycle for MPPI, PAC-GPC and open-loop GPC](/projects/satellitegpc/media/results-latency.png)

Running the policy open-loop is 40x faster still and smoother than either, but it never completes the task. It reproduces the expert's gross motion and brings the robot close to the box, then fails to land inside the tight grasp tolerance. Distillation captures the trajectory but not the terminal precision, so a small amount of online sampling is still needed to close the loop against the true dynamics.

![Grasp success and time to grasp; the open-loop policy never succeeds](/projects/satellitegpc/media/results-success.png)

The remaining latency is dominated by rollout depth rather than sample count: the 100 horizon steps are sequential on the GPU whether the batch is 8 or 512, and swapping an RTX 3070 for a 5090 barely moved loop times. Integrating the warm-started sampler at 0.1 s instead of 0.01 s over the same horizon holds success rate, tracking error and jitter while dropping latency to roughly 2 ms — an 18x speedup over the baseline. The natural next steps are a learned terminal value function to shorten the horizon further, the full 13-DOF 3D system, and validation on embedded hardware.
