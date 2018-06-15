import React from 'react';
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import Header from '../components/Header';
import Messages from '../components/Messages';
import Input from '../components/Input';
import AppyLayout from '../components/AppLayout';

export default () => (
  <AppyLayout clasName="app-layout">
    <Teams>Teams</Teams>
    <Channels>Channels</Channels>
    <Header>Header</Header>
    <Messages clasName="message">
      <ul className="message-list">
        <li>xxx</li>
        <li>yyy</li>
      </ul>
    </Messages>
    <Input>
      <input type="text" style={{ width: '100%' }} placeholder="yyyyyyyy" />
    </Input>
  </AppyLayout>
);
