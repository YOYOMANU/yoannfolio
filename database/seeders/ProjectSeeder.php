<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'slug' => 'shoplite',
                'title' => 'ShopLite Immobilier',
                'category' => 'Plateforme immobilière',
                'short_description' => 'Plateforme immobilière haut de gamme pour le marché abidjanais — dashboard de gestion, recherche géolocalisée, galeries multi-images.',
                'long_description' => "ShopLite répond à un besoin critique du marché immobilier ouest-africain : la centralisation et la vérification des annonces haut de gamme. L'application intègre une architecture asynchrone permettant de gérer de lourds volumes de médias tout en proposant une expérience fluide proche du natif.",
                'problem' => "Les sites d'annonces souffrent d'un manque crucial de hiérarchie visuelle, de lenteurs dues au poids des images non optimisées, et d'une absence d'outils analytiques avancés pour les professionnels de l'immobilier.",
                'solution' => "Mise en place d'un pipeline complet d'optimisation d'images côté serveur avec Laravel. L'implémentation d'Inertia.js permet de conserver la puissance de routage de Laravel tout en pilotant une interface utilisateur React réactive et haut de gamme.",
                'role' => 'Full-Stack Engineer / Lead Architect',
                'context' => 'Projet Principal (2026)',
                'swatch_class' => 'swatch-shoplite',
                'live_url' => null,
                'repo_url' => null,
                'is_featured' => true,
                'stack' => ['Laravel', 'Inertia.js', 'React', 'TypeScript', 'shadcn/ui', 'PostgreSQL'],
                'features' => [
                    ['title' => 'Dashboard sur-mesure', 'description' => "Suivi en temps réel des statistiques d'affichage des propriétés, gestion des statuts de publication et modération des annonces."],
                    ['title' => 'Moteur de recherche complexe', 'description' => 'Filtrage multicritères ultra-rapide basé sur la géolocalisation par quartier à Abidjan.'],
                    ['title' => 'Galeries Premium', 'description' => 'Expérience immersive optimisée pour mobile avec support du glisser-déposer (Drag & Drop) pour le téléversement.'],
                ],
            ],
            [
                'slug' => 'techbook',
                'title' => 'TechBook',
                'category' => 'Catalogue technologique',
                'short_description' => 'SPA de suivi de compétences techniques, déployé en production avec authentification et stockage cloud.',
                'long_description' => "TechBook est un outil professionnel conçu pour cartographier en temps réel les stacks techniques et les compétences logicielles au sein de structures d'ingénierie ou pour des portefeuilles personnels avancés.",
                'problem' => 'Suivre la progression sur des dizaines de technologies avec des métriques claires devient vite ingérable via de simples fichiers de documentation textuels.',
                'solution' => "Création d'une Single Page Application découplée utilisant une API REST standard, conteneurisée intégralement sous Docker pour simplifier les processus de déploiement continu.",
                'role' => 'Solo Developer',
                'context' => 'Projet Open Source',
                'swatch_class' => 'swatch-techbook',
                'live_url' => null,
                'repo_url' => null,
                'is_featured' => false,
                'stack' => ['Laravel', 'React', 'PostgreSQL', 'Docker', 'MongoDB'],
                'features' => [
                    ['title' => 'Suivi Granulaire', 'description' => "Visualisation des niveaux d'expertise par modules techniques via des graphes interactifs."],
                    ['title' => 'Architecture Hybride', 'description' => 'Utilisation astucieuse de structures relationnelles PostgreSQL combinées à un cluster MongoDB Atlas pour la flexibilité des schémas de logs.'],
                ],
            ],
            [
                'slug' => 'myuns',
                'title' => 'MyUNS',
                'category' => 'Application étudiante',
                'short_description' => 'Portail étudiant développé en parallèle en React Native et en Kotlin natif.',
                'long_description' => "MyUNS centralise la vie universitaire des étudiants : plannings de cours, notifications d'examens et accès aux ressources pédagogiques hors-ligne.",
                'problem' => "Les portails universitaires web classiques sont rarement adaptés aux connexions mobiles instables et manquent cruellement de notifications push pour les changements d'emploi du temps.",
                'solution' => "Conception d'un moteur de synchronisation locale (Offline-first) permettant de stocker les plannings directement sur l'appareil de l'étudiant dès qu'une connexion réseau est détectée.",
                'role' => 'Mobile Developer',
                'context' => 'Projet Universitaire',
                'swatch_class' => 'swatch-myuns',
                'live_url' => null,
                'repo_url' => null,
                'is_featured' => false,
                'stack' => ['React Native', 'Expo', 'Kotlin', 'Android'],
                'features' => [
                    ['title' => 'Double implémentation', 'description' => "Développement d'une version cross-platform agile (React Native) et d'un noyau natif performant (Kotlin)."],
                    ['title' => 'Mode Hors-ligne complet', 'description' => "Accès immédiat aux données de l'agenda universitaire même sans couverture internet."],
                ],
            ],
        ];

        foreach ($projects as $data) {
            $project = Project::firstOrCreate(
                ['slug' => $data['slug']],
                [
                    'title' => $data['title'],
                    'category' => $data['category'],
                    'short_description' => $data['short_description'],
                    'long_description' => $data['long_description'],
                    'problem' => $data['problem'],
                    'solution' => $data['solution'],
                    'role' => $data['role'],
                    'context' => $data['context'],
                    'swatch_class' => $data['swatch_class'],
                    'live_url' => $data['live_url'],
                    'repo_url' => $data['repo_url'],
                    'is_featured' => $data['is_featured'],
                    'status' => 'published',
                ]
            );
        }
    }
}
