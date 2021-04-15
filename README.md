# Assignment App

## Fonctionnalités pris en charge
> PROFESSEUR
- S'inscrire / Se connecter / Se déconnecter
- Consulter ses informations (une page à propos dans laquelle le professeur veut visualiser les informations lui concernant)
- Créer / modifier une publication sur les projets 
- Consulter la liste des publications sur les projets **(Implémentation de Infinite scroll d'Angular)**
- Consulter les étudiants qui ont déjà fini son devoir **(Implémentation de Drag and Drop)**
- Noter et commenter les devoirs des étudiants 
- Consulter la liste des étudiants dans les 2 promotions (MBDS et Licence)

> ETUDIANT
- S'inscrire / Se connecter / Se déconnecter
- Consulter ses informations (une page à propos dans laquelle l'étudiant veut visualiser les informations lui concernant)
- Consulter la liste des projets mis en lignes par les professeurs (qui les correspond)(de leur classe)
- Visualiser le détail de son devoir qui a été rendu (les remarques, les notes, les urls des projets)
- Consulter la liste des devoirs déjà rendu 


## Installation

Assignment App a besoin de [Node.js](https://nodejs.org/) v10+.
Assignment App a été conçu par [Angular](https://angular.io/guide/setup-local/) v11.

Installation des dépendances et faire marcher le serveur

```sh
cd assignment-app
npm i
ng serve -o
```

## Modules d'Angular utilisés
- Reactive Forms Module, 
- FormsModule,
- MatFormFieldModule, 
- MatInputModule,
- MatCardModule,
- MatButtonModule,
- MatIconModule,
- MatCheckboxModule,
- MatRadioModule,
- MatSnackBarModule,
- MatSelectModule,
- MatDividerModule,
- MatListModule,
- MatButtonToggleModule,
- MatTabsModule,
- MatDatepickerModule,
- MatNativeDateModule,
- MatBadgeModule,
- MatExpansionModule,
- MatToolbarModule,
- MatDialogModule,
- MatTooltipModule,
- MatProgressSpinnerModule,
- BrowserAnimationsModule,
- HttpClientModule,
- ScrollingModule,
- DragDropModule,

## Autres outils d'Angular utilisés
- Pipes (pour gérer les dates, affichage des dates)
- Guard (pour gérer les autorisations après les authentifications)
- Interceptor (pour gérer les résultats venant de l'API, y mettre les token)

## La liste de quelques professeurs pour le test
1) kruben0@freewebs.com / 12345678
2) jmoens1@linkedin.com /  12345678
3) sstrut2@tmall.com /  12345678
4) gjarrel3@qq.com /  12345678
5) clodewick4@angelfire.com /  12345678

## La liste de quelques étudiants pour le test 
1) ctingly0@toplist.cz / 12345678
2) npottle1@senate.gov / 12345678
3) tclout2@freewebs.com / 12345678
4) mpaulin3@163.com / 12345678
5) jharbach4@1688.com / 12345678
6) skull5@wisc.edu / 12345678
7) mrosencrantz6@addthis.com / 12345678
8) sfandrey7@fotki.com / 12345678
9) mtokell8@jugem.jp / 12345678
10) hzanotti9@salon.com / 12345678

## Informations
La pluparts de nos codes sont tirés du site web officiels d'angular pour les fonctionnements des modules
Pour les SCSS et Design, quelques portions ont été copiées d'un free template d'un hôpital "Medicare" (Medicare Plus Medical Health HTML Template) et les autres de nos propres immaginations. 

En cas de bugs, [Stackoverflow](https://stackoverflow.com/)  était notre meilleure option. 
Le long du projet, on a utilisés 
1) Interface
2) Pipe 
  • [Angular Tutorial: Working with Angular Pipes](https://www.intertech.com/angular-tutorial-working-with-angular-pipes/) 
  • [Creating Custom Pipes in Angular](https://nishugoel.medium.com/creating-custom-pipes-in-angular-2b082a5dc74b)
3) Service
4) Class
5) Interceptor
  • [HttpInterceptor](https://angular.io/api/common/http/HttpInterceptor)
  • Vidéo tutoriel dans pluralsight
6) Guard
   • [CanActivate](https://angular.io/api/router/CanActivate)


_Le long du projet, quelques explications de nos collègues, quelques experts dans le domaine nous ont fortement aidés._ 

## Accès
L'application est disponible en ligne également. Elle est déployée sur [Heroku - Assignment App](https://assignment-frontend01.herokuapp.com/)

