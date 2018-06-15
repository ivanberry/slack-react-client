import React from 'react';
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import Header from '../components/Header';
import Messages from '../components/Messages';
import AppyLayout from '../components/AppLayout';
import SendMessage from '../components/SendMessage';

export default () => (
  <AppyLayout clasName="app-layout">
    <Teams teams={[{ id: 1, name: 'T1' }, { id: 2, name: 'T2' }]} />
    <Channels
      teamName="Micheal"
      username="Micheal"
      channels={[{ id: 1, name: 'General' }, { id: 2, name: 'random' }]}
      users={[
        { id: 1, name: 'tab' },
        { id: 2, name: 'shriting' },
        { id: 3, name: 'amy' },
      ]}
    >
      Channels
    </Channels>
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
