import UiElement from '../Element';
import Message from '../ui/Message';
import InputMessage from '../ui/InputMessage';
import ChatList from '../ui/ChatList';
import SpeedDial from '../ui/SpeedDial';
import BlinkinDot from '../ui/BlinkinDot';
import { 
  blinkinDotCode, 
  messageCode, 
  inputMessageCode, 
  chatListCode, 
  speedDialCode 
} from './CodeData';

const sections = [
  {
    id: 'message',
    title: 'Message',
    content: (
      <UiElement
        title="Message"
        component={Message}
        defaultProps={{
          message: 'Test messagge',
          showTime: true,
          fontsize: '16px',
          color: '#333',
          copyToClipboard: true
        }}
        fields={[
          { name: 'message', type: 'string' },
          { name: 'showTime', type: 'boolean' },
          { name: 'fontsize', type: 'string' },
          { name: 'color', type: 'color' },
          { name: 'copyToClipboard', type: 'boolean' }
        ]}
        code={messageCode}
      />
    )
  },
  {
    id: 'input',
    title: 'Input',
    content: (
      <UiElement
        title="Input bar"
        component={InputMessage}
        defaultProps={{color: "#007bff", encryptEffect: false}}
        fields={[
          { name: 'color', type: 'color' },
          { name: 'encryptEffect', type: 'boolean' }
        ]}
        code={inputMessageCode}
      />
    )
  },
  {
    id: 'chat list',
    title: 'Chat List',
    content: (
      <UiElement
        title="Chat List"
        code={chatListCode}
        component={ChatList}
        defaultProps={undefined}
      />
    )
  },
  {
    id: 'speed dial',
    title: 'Speed Dial',
    content: (
      <UiElement
        title="Speed Dial"
        code={speedDialCode}
        component={SpeedDial}
      />
    )
  },
  {
    id: 'blinkin dot',
    title: 'Blinkin Dot',
    content: (
      <UiElement
        title="Blinkin Dot"
        code={blinkinDotCode}
        defaultProps={{color: "#19c37d"}}
        fields={[
          { name: 'color', type: 'color' }
        ]}
        component={BlinkinDot}
      />
    )
  }
];

export default sections; 