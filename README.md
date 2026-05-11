# DigitalOcean TAM Case Study: Scalable Web Application

## Overview
This repository contains the configuration files and documentation to deploy a highly available, auto-scaling Node.js application on DigitalOcean Kubernetes (DOKS). This architecture was designed to balance high performance with cost optimization.

## Architecture Highlights
* **Compute:** 2-Node DigitalOcean Kubernetes (DOKS) Cluster using Basic Droplets.
* **Networking:** DigitalOcean Cloud Load Balancer (Routing Port 80 to Container Port 3000).
* **Reliability:** Multi-node pod distribution ensures zero-downtime during individual node maintenance.
* **Elasticity:** Horizontal Pod Autoscaler (HPA) configured to scale up to 5 pods at 50% CPU utilization.

## Prerequisites
* doctl (DigitalOcean CLI) authenticated.
* kubectl installed and configured for the cluster context.
* Docker installed (Note: Apple Silicon users must use cross-platform build flags).

## Deployment Guide

### 1. Build and Push the Container Image
To ensure the image built on an Apple Silicon (ARM64) machine works on DigitalOcean's Intel/AMD nodes, use the following build command (Replace kaushikady with your Docker Hub username):

```bash 
docker build --platform linux/amd64 -t kaushikady/digitalocean-tam-app:v2 .
docker push kaushikady/digitalocean-tam-app:v2
```
### 2. Provision Kubernetes Resources
Apply the deployment blueprint to provision the application pods and the external Load Balancer:

```bash
kubectl apply -f deployment.yaml
```
### 3. Configure Autoscaling (HPA)
Enable dynamic scaling to manage traffic spikes while minimizing idle resource costs:

```bash
kubectl autoscale deployment tam-app-deployment --cpu-percent=50 --min=1 --max=5
```
### 4. Verification
Once the Load Balancer status changes from `pending` to an IP address, access the application via:

```bash
kubectl get svc
```
## Expected Output:
```{"message":"DigitalOcean TAM Case Study: App is running flawlessly!","status":"Healthy"}```

## Strategic Recommendations (TAM Perspective)
* In a production-grade environment, the following optimizations are recommended:

* Security Posture: Implement SSL/TLS termination at the Load Balancer level using DigitalOcean’s managed Let's Encrypt integration to secure traffic.

* Cost Management: Enable the DOKS Cluster Autoscaler. This allows the cluster to automatically add or remove physical Droplet nodes based on total workload, ensuring you only pay for what you use.

* Data Decoupling: Migrate stateful data (if any) to a DigitalOcean Managed Database. This ensures data persistence and simplifies cluster maintenance and recovery.
