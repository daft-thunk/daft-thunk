import React from 'react';
import { Icon } from 'semantic-ui-react';

export default function Footer(){
  return (
    <div className="footer">
    <div id="company-info">
    <Icon name="copyright" /> Daft Thunk Boiz
    </div>
    <div id="socials">
    <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://www.facebook.com/daft.thunk.9"><Icon link name="facebook official" /> </a>
    <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://www.twitch.tv/daftthunk"><Icon link name="twitch" />
    </a>
    <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://twitter.com/daft_thunk"><Icon link name="twitter square" /></a>
    <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://github.com/daft-thunk"><Icon link name="github" /></a>
    </div>
  </div>
  );
}
