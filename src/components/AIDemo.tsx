
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const AIDemo = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Hi! I\'m your AI coding assistant. Try asking me to "Create a todo app in React" or "Fix this bug in my code".'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const demoResponses = {
    'create todo app': `Here's a React Todo App for you:

\`\`\`jsx
import React, { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: input, 
        completed: false 
      }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  return (
    <div className="todo-app p-6">
      <h1 className="text-2xl font-bold mb-4">My Todo List</h1>
      
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            className={\`p-2 border rounded cursor-pointer \${
              todo.completed ? 'bg-green-100 line-through' : 'bg-white'
            }\`}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
\`\`\`

This todo app includes:
✅ Add new todos
✅ Mark todos as complete
✅ Clean, responsive design
✅ State management with hooks`,

    'fix bug': `I'd be happy to help fix your bug! Here are some common fixes:

**Common React Bug Fixes:**

1. **State not updating?**
   \`\`\`jsx
   // ❌ Wrong - mutating state
   state.items.push(newItem);
   
   // ✅ Correct - immutable update
   setState([...state.items, newItem]);
   \`\`\`

2. **Component not re-rendering?**
   \`\`\`jsx
   // Add key prop for list items
   {items.map(item => (
     <Item key={item.id} data={item} />
   ))}
   \`\`\`

3. **Memory leak in useEffect?**
   \`\`\`jsx
   useEffect(() => {
     const interval = setInterval(() => {
       // do something
     }, 1000);
     
     // ✅ Don't forget cleanup
     return () => clearInterval(interval);
   }, []);
   \`\`\`

Share your specific code and I'll give you a targeted solution!`,

    'explain algorithm': `Let me explain algorithms with a simple example:

**Binary Search Algorithm:**

\`\`\`javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found target
    } else if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  
  return -1; // Not found
}
\`\`\`

**How it works:**
1. Start with sorted array
2. Check middle element
3. If match → return index
4. If target is larger → search right half
5. If target is smaller → search left half
6. Repeat until found or exhausted

**Time Complexity:** O(log n) - much faster than linear search!`,

    'default': `I can help you with:

🔧 **Code Generation** - "Create a login form"
🐛 **Bug Fixing** - "Fix this error in my code"  
📚 **Code Explanation** - "Explain this algorithm"
⚡ **Optimization** - "Make this code faster"
🧪 **Testing** - "Write tests for this function"
📝 **Documentation** - "Document this API"

Try typing one of these requests above!`
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    setIsTyping(true);
    
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = demoResponses.default;
      
      if (lowerInput.includes('todo') || lowerInput.includes('create')) {
        response = demoResponses['create todo app'];
      } else if (lowerInput.includes('bug') || lowerInput.includes('fix') || lowerInput.includes('error')) {
        response = demoResponses['fix bug'];
      } else if (lowerInput.includes('algorithm') || lowerInput.includes('explain')) {
        response = demoResponses['explain algorithm'];
      }
      
      const aiMessage = { type: 'ai', content: response };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
    
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold gradient-text">Try AI Assistant</h2>
          </div>
          <p className="text-xl text-gray-600">
            See how our AI helps you code. This is a demo - sign up for the full experience!
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              AI Coding Assistant Demo
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-white border shadow-sm'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {message.type === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4 text-primary" />
                      )}
                      <span className="font-medium">
                        {message.type === 'user' ? 'You' : 'AI Assistant'}
                      </span>
                    </div>
                    <div className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white border shadow-sm rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-4 w-4 text-primary" />
                      <span className="font-medium">AI Assistant</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Try: 'Create a todo app' or 'Fix this bug'"
                className="flex-1"
                disabled={isTyping}
              />
              <Button onClick={handleSend} disabled={isTyping || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 mb-2">
                This is a demo. Sign up to access all AI tools!
              </p>
              <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                <a href="/signup">Get Full Access</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AIDemo;
