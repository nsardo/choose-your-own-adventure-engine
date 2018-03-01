import { FlowRouter } from 'meteor/kadira:flow-router';
import { React }      from 'react';

import { mount }  from 'react-mounter';
import App        from '/imports/ui/App';
import StoryAdmin from '/imports/ui/StoryAdmin';


FlowRouter.route( '/', {
  name: 'root',
  action: () => mount(App)
});

FlowRouter.route('/story-admin', {
  name: 'story-admin',
  action: () => mount(StoryAdmin)
});