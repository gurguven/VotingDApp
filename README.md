# Voting DApp - Alyra | Projet 3

This box comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app.

# TESTS UNITAIRES DU CONTRAT "VOTING.SOL"

## Sommaire
- Lien de la vidéo de démonstration
- Lien de la DApp déployée sur Goërli
- Dépendances & outils utilisés 
- Utilisation
- Modification du contrat Voting.sol
- Déroulement du processus de vote

---

## Lien de la vidéo de démonstration
- https://www.loom.com/share/590755dc1a104d15894a86ae32c60cad


---

## Lien de la DApp déployée sur Goërli
(veillez à vous connecter sur le bon network) 
- https://voting-d-app-git-main-gurguven.vercel.app/

---

## Dépendances & outils utilisés
**Afin de réaliser notre DApp, différentes ressources ont été utilisées :**
- Truffle, un framework de déploiement de contrat solidity
- React.js, via le boiler plate de truffle
--- 

## Utilisation 
(*avec [Truffle](https://trufflesuite.com/docs/truffle/) & [Ganache](https://trufflesuite.com/docs/ganache/) et [@openzeppelin/contracts](https://www.npmjs.com/package/@openzeppelin/contracts) au préalable d'installé*)

Dans le dossier truffle : 
1. `ganache`
2. `truffle migrate --network development`
Dans le dossier client 
3. `npm install `
4. `npm start`
---

## Modification du contrat Voting.sol

[Voting.sol](https://github.com/gurguven/VotingDApp/blob/main/truffle/contracts/Voting.sol)

**Le contrat Voting.sol contient optimisations:**

- Afin de régler une faille du DOS Gas limit, un uint sentProposal a été rajouté dans la structure Voter afin d'enregistrer, puis limiter
le nombre de propositions attribuables par personne dans la fonction sendProposals
- L'ajout de commentaires Natspec
- L'impossiblité de cloturer la session de propositions si il n'y a pas plus de deux propositions
- L'impossibilité de cloturer la session de votes si il n'y a pas plus d'1 vote enregistré 

## Déroulement du processus de vote

- L'owner enregistre les voters via leur addresse ethereum
- L'owner met fin à la session d'enregistrement des voters 
- L'owner débute la session d'enregistrement des propositions
- Les voteurs soumettent leurs propositions (3 maximum) 
- L'owner met fin à la session d'enregistrement des propositions 
- L'owner débute la session d'enregistrement des votes
- Les voteurs votent pour leur proposition préférée (1 vote maximum) 
- L'owner met fin à la session d'enregistrement des votes 
- L'owner débute la comptabilisation des votes : la proposition gagnante est déterminée 



