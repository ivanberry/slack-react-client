import React from 'react';

import Header from '../components/Header';
import Messages from '../components/Messages';
import AppyLayout from '../components/AppLayout';
import SendMessage from '../components/SendMessage';
import Sidebar from '../container/Sidebar';

export default () => (
  <AppyLayout clasName="app-layout">
    <Sidebar currentTeamId={15} />
    <Header channelName="general" />
    <Messages clasName="message">
      <ul className="message-list">
        <li>xxx</li>
        <li>yyy</li>
      </ul>
    </Messages>
    <SendMessage channelName="general" />
  </AppyLayout>
);
