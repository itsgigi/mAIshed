import AIAutoCompleteDemo from '../hooks/AIAutoCompleteDemo';
import AIModerationDemo from '../hooks/AIModerationDemo';
import HookElement from '../hooks/HookElement';
import SteamingResponses from '../hooks/SteamingResponses';

const sections = [
  {
    id: 'useStreamResponses',
    title: 'useStreamResponses',
    content: (
      <HookElement
        title="useStreamResponses"
        component={SteamingResponses}
        /* defaultProps={{
          message: 'Prova messaggio',
          showTime: true,
          fontsize: '16px',
          color: '#333'
        }}
        fields={[
          { name: 'message', type: 'string' },
          { name: 'showTime', type: 'boolean' },
          { name: 'fontsize', type: 'string' },
          { name: 'color', type: 'color' }
        ]} */
        code={`test`}
      />
    )
  },
  {
    id: 'useAIAutoComplete',
    title: 'useAIAutoComplete',
    content: (
      <HookElement
        title="useAIAutoComplete"
        component={AIAutoCompleteDemo}
        code={`test`}
      />
    )
  },
  {
    id: 'useAIModeration',
    title: 'useAIModeration',
    content: (
      <HookElement
        title="useAIModeration"
        component={AIModerationDemo}
        code={`test`}
      />
    )
  },
];

export default sections; 