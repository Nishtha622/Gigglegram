import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';
import postRoutes from './post.route.js';
import adminRoutes from './admin.route.js';
import notificationRoutes from './notification.route.js';
import messagesRoutes from './messages.route.js';
import reelRoutes from './reel.route.js';
import storyRoutes from './story.route.js';
import helpdeskRoutes from './query.route.js';
import subscriptionRoutes from './subscription.route.js';
import VIPAccessRoutes from './VIPAccess.route.js';

export default (app) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/notifications', notificationRoutes);
  app.use('/api/messages', messagesRoutes);
  app.use('/api/reels', reelRoutes);
  app.use('/api/stories', storyRoutes);
  app.use('/api/help', helpdeskRoutes);
  app.use('/api/subs', subscriptionRoutes);
  app.use('/api/vipaccess', VIPAccessRoutes);
};
