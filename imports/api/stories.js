import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Stories = new Mongo.Collection('stories');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('storiesPub', function storyPublication() {
    return Stories.find({

    });
  });
}

Meteor.methods({
  'story.insert'(type, text, ref, opt) {
    check(type, String);
    check(text, String);

    if ( type == 'option' || type == 'decision_with_id' ) opt = '';
    let id = Stories.insert({
      type,
      text,
      ref,
      opt,
      createdAt: new Date(),
    });

    return id;
  },
  'story.remove'(storyId) {
    check(storyId, String);
    
    const story = Stories.findOne(storyId);

    Stories.remove(storyId);
  },
});
