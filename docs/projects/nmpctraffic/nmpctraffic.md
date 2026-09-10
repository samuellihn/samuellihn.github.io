---
title: NMPC Trajectory Generation for Cooperative Vehicle Coordination
date: 2025-12-15
status: Completed
thumbnail: global-path.png
description: SQP-based NMPC for cooperative vehicles on real road networks.
---

**In collaboration with: Edzel Li**

Coordinating a fleet of autonomous vehicles through a road network requires generating trajectories online, since obstacles and peer plans are unknown until run time. Nonlinear MPC suits the problem because vehicle kinematics are genuinely nonlinear, but the resulting optimization is non-convex and numerically heavy — exactly what keeps it out of high-frequency use. This course final project builds a sequential quadratic programming NMPC planner for non-holonomic vehicles on real map data and examines what actually determines whether the solver converges. I built the NMPC backbone and global planning layer; Edzel Li implemented the collision-avoidance formulations and warm-start variants.

# Formulation

Each vehicle uses a kinematic bicycle model, with position, heading and speed as the state and acceleration and steering as inputs, under a cost combining reference tracking, control effort and input-rate smoothing. Collision avoidance — between vehicles, and against dynamic obstacles approximated as ellipses to absorb prediction uncertainty — uses soft penalties rather than hard constraints, since hard constraints readily render the SQP subproblem infeasible. Road networks come from OpenStreetMap via osmnx, projected to UTM and converted into convex polytope corridors at a 7 m lane width.

The consequential design decision is how to keep the vehicle on the road. Encoding "stay within the union of road segments" with Big-M binary variables is the textbook approach, but it turns every step into a mixed-integer program; in practice it returned infeasible while taking over a second per solve. Precomputing a corridor of half-spaces around a reference path instead keeps the feasible set convex, so each SQP step remains a plain QP.

# Hierarchical Warm-Start

The main contribution is the initialization strategy, since SQP on a non-convex problem lives or dies by its initial guess. The warm start runs in three stages: a graph search over the road network for topological waypoints, piecewise Dubins paths between consecutive waypoints to respect the vehicle's minimum turning radius, and a velocity profile derived from Menger curvature under lateral and longitudinal acceleration limits to supply the timing that a purely geometric path lacks.

Skipping the middle stage is instructive. Interpolating the graph-search path directly produces sharp corners that violate the turning radius, and because slack variables are present to keep the solver running, the optimizer exploits that relaxation rather than respecting the dynamics — the trajectory diverges across the map instead of converging.

![A failed solve warm-started with raw shortest-path interpolation, wandering far off the road network](/projects/nmpctraffic/media/warmstart-failure.png)

With the full pipeline, the solver produces smooth trajectories that stay inside the drivable corridor.

![A converged, drivable trajectory produced with the combined warm-start and boundary constraints](/projects/nmpctraffic/media/feasible-plan.png)

# Results

Solver timing tracks the convexity argument directly. The combined warm start with half-space boundaries solved in 9–10 ms per iteration under Clarabel, against 160–180 ms for a mixed-integer solver on the strictly easier collision-free case, while the Big-M boundary formulation exceeded a second and still returned infeasible. The warm start also allowed the horizon to grow from 40 to 120 steps while solving faster and more consistently, letting the MPC absorb the global planning problem rather than track a precomputed path.

Two limitations stand out. The vehicle hugs and occasionally crosses lane edges, apparently maximizing speed by using the full corridor width much like taking a racing apex, and the distributed multi-agent architecture was formulated but not fully implemented. Extending to centralized fleet control is mostly a matter of concatenating state and constraint matrices across vehicles; the harder open problem is enforcing lane keeping without paying for binary variables.
