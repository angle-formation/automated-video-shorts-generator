# 🎥 b2026-video-platform

Une application web full-stack performante conçue pour automatiser la création et le rendu de vidéos au format court (Shorts, TikTok, Reels). Ce projet combine la puissance de **Next.js** pour l'interface et l'API, et de **Remotion** pour la création de vidéos programmatiques en React et Three.js.

Pour gérer efficacement les rendus vidéo lourds sans bloquer l'application, le projet intègre une architecture distribuée avec **BullMQ** et **Redis** pour la gestion des files d'attente (queues).

## 🛠️ Technologies utilisées

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Vidéo:** [Remotion](https://www.remotion.dev/) (Framework de programmation vidéo en React)
* **3D / Graphismes:** [Three.js](https://threejs.org/)
* **Gestion des tâches:** [BullMQ](https://taskforcesh.github.io/bullmq/) & [ioredis](https://github.com/redis/ioredis)
* **Base de données / Cache:** [Redis](https://redis.io/)
* **Langage:** [TypeScript](https://www.typescriptlang.org/)

## 🚀 Installation et Lancement

### Prerequisites

Assurez-vous d'avoir installé et démarré un serveur **Redis** sur votre machine :

```bash
# Activer et démarrer Redis
sudo systemctl enable --now redis

# Vérifier le statut de Redis
sudo systemctl status redis

by httmls://www.angleformation.com
