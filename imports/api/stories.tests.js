/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';

import { Stories } from './stories.js';

if (Meteor.isServer) {
  describe('Story', () => {
    describe('methods', () => {
      let storyId;

      beforeEach(() => {
        Stories.remove({});
        storyId = Stories.insert({
          text: 'test task',
          createdAt: new Date(),
        });
      });

      it('can delete owned task', () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const deleteStory = Meteor.server.method_handlers['story.remove'];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { storyId };

        // Run the method with `this` set to the fake invocation
        deleteStory.apply(invocation, [storyId]);

        // Verify that the method does what we expected
        assert.equal(Stories.find().count(), 0);
      });
    });
  });
}
