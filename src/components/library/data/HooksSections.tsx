import AIAutoCompleteDemo from '../hooks/AIAutoCompleteDemo';
import AIModerationDemo from '../hooks/AIModerationDemo';
import SteamingResponses from '../hooks/SteamingResponses';
import UiElement from '../Element';
import { 
  useStreamResponsesCode, 
  useAIAutoCompleteCode, 
  useAIModerationCode 
} from './HooksCodeData';

const sections = [
  {
    id: 'useStreamResponses',
    title: 'useStreamResponses',
    content: (
      <UiElement
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
        code={useStreamResponsesCode}
      />
    )
  },
  {
    id: 'useAIAutoComplete',
    title: 'useAIAutoComplete',
    content: (
      <UiElement
        title="useAIAutoComplete"
        component={AIAutoCompleteDemo}
        code={useAIAutoCompleteCode}
      />
    )
  },
  {
    id: 'useAIModeration',
    title: 'useAIModeration',
    content: (
      <UiElement
        title="useAIModeration"
        component={AIModerationDemo}
        code={useAIModerationCode}
      />
    )
  },
];

export default sections; 