// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Players = new Mongo.Collection("players");

if (Meteor.isClient) {
  Template.leaderboard.onCreated(function() {
    this.subscribe('scientists');
  });

  Template.leaderboard.helpers({
    players() {
      return Players.find({}, {sort: {score: -1, name: 1}});
    },
    selectedName() {
      let player = Players.findOne(Session.get("selectedPlayer"));
      return player && player.name;
    }
  });

  Template.leaderboard.events({
    'click .inc'() {
      Meteor.call('incScore', Session.get("selectedPlayer"));
    }
  });

  Template.player.helpers({
    selected() {
      return Session.equals("selectedPlayer", this._id) ? "selected" : '';
    }
  });

  Template.player.events({
    'click'() {
      Session.set("selectedPlayer", this._id);
    }
  });
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(() => {
    if (Players.find().count() === 0) {
      let names = [
        "Ada Lovelace",
        "Grace Hopper", 
        "Marie Curie",
        "Carl Friedrich Gauss",
        "Nikola Tesla",
        "Claude Shannon"
      ];
      names.forEach(name => {
        let score = Math.floor(Random.fraction() * 10) * 5;
        Players.insert({name, score});
      });
    }
  });

  Meteor.publish('scientists', function() {
    return Players.find({});
  });

  Meteor.methods({
    incScore(player) {
      if (!player) return;
      Players.update(player, {$inc: {score: 5}});
    }
  });
}
