import { AppConstants } from "../../../imports/constants";
import { Players } from "../../../imports/api/playersApi";

Meteor.publish(AppConstants.Players.Publications.PLAYERS_GET, function () {
  return Players.find({}, { sort: { playerType: 1, score: -1, name: 1 } });
});
