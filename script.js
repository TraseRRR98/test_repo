// Sample data for demonstration
const sampleIncorrectQuestions = [
    {
        id: 1,
        question: "What is the time complexity of binary search?",
        yourAnswer: "O(n)",
        correctAnswer: "O(log n)",
        topic: "Algorithms",
        date: "2024-01-15"
    },
    {
        id: 2,
        question: "Which data structure uses LIFO principle?",
        yourAnswer: "Queue",
        correctAnswer: "Stack",
        topic: "Data Structures",
        date: "2024-01-14"
    },
    {
        id: 3,
        question: "What does CSS stand for?",
        yourAnswer: "Computer Style Sheets",
        correctAnswer: "Cascading Style Sheets",
        topic: "Web Development",
        date: "2024-01-13"
    }
];

const sampleChatHistory = [
    {
        id: 1,
        sender: "You",
        message: "Can you explain how binary search works?",
        timestamp: "2024-01-15 10:30 AM",
        type: "user"
    },
    {
        id: 2,
        sender: "Bot",
        message: "Binary search works by repeatedly dividing the search interval in half. It compares the target value with the middle element of the array.",
        timestamp: "2024-01-15 10:31 AM",
        type: "bot"
    },
    {
        id: 3,
        sender: "You",
        message: "What's the time complexity?",
        timestamp: "2024-01-15 10:32 AM",
        type: "user"
    },
    {
        id: 4,
        sender: "Bot",
        message: "The time complexity of binary search is O(log n) because with each comparison, it eliminates half of the remaining elements.",
        timestamp: "2024-01-15 10:33 AM",
        type: "bot"
    },
    {
        id: 5,
        sender: "You",
        message: "Thanks!",
        timestamp: "2024-01-15 10:34 AM",
        type: "user"
    }
];

// Chat messages array
let chatMessages = [];

// Initialize the UI
function initializeUI()
{
    setupToggleButtons();
    renderIncorrectQuestions();
    renderChatHistory();
    updateBadgeCounts();
    setupChatInterface();
    showWelcomeMessage();
}

// Setup toggle button functionality
function setupToggleButtons()
{
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const menuPanels = document.querySelectorAll('.menu-panel');

    toggleButtons.forEach(button => 
    {
        button.addEventListener('click', () => 
        {
            const targetMenu = button.getAttribute('data-menu');

            // Remove active class from all buttons and panels
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            menuPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding menu panel
            const targetPanel = document.getElementById(`${targetMenu}-menu`);
            if (targetPanel)
            {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Render incorrect questions
function renderIncorrectQuestions()
{
    const container = document.getElementById('incorrect-questions-list');
    
    if (sampleIncorrectQuestions.length === 0)
    {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📝</div>
                <div class="empty-text">No incorrect questions yet</div>
            </div>
        `;
        return;
    }

    container.innerHTML = sampleIncorrectQuestions.map(question => `
        <div class="question-item">
            <div class="question-text">${question.question}</div>
            <div class="incorrect-answer">❌ Your answer: ${question.yourAnswer}</div>
            <div class="correct-answer">✅ Correct answer: ${question.correctAnswer}</div>
            <div class="question-meta">
                <div class="meta-item">
                    <span>📚</span>
                    <span>${question.topic}</span>
                </div>
                <div class="meta-item">
                    <span>📅</span>
                    <span>${question.date}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Render chat history
function renderChatHistory()
{
    const container = document.getElementById('chat-history-list');
    
    if (sampleChatHistory.length === 0)
    {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">💬</div>
                <div class="empty-text">No chat history yet</div>
            </div>
        `;
        return;
    }

    container.innerHTML = sampleChatHistory.map(chat => `
        <div class="chat-item ${chat.type}-message">
            <div class="chat-header">
                <div class="chat-sender">${chat.sender}</div>
                <div class="chat-time">${chat.timestamp}</div>
            </div>
            <div class="chat-message">${chat.message}</div>
        </div>
    `).join('');
}

// Update badge counts
function updateBadgeCounts()
{
    document.getElementById('incorrect-count').textContent = sampleIncorrectQuestions.length;
    document.getElementById('history-count').textContent = sampleChatHistory.length;
}

// Setup chat interface
function setupChatInterface()
{
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');

    chatForm.addEventListener('submit', (e) => 
    {
        e.preventDefault();
        const message = userInput.value.trim();
        
        if (message)
        {
            addChatMessage(message, 'user');
            userInput.value = '';
            
            // Simulate bot response (replace with actual API call)
            setTimeout(() => 
            {
                const botResponse = generateBotResponse(message);
                addChatMessage(botResponse, 'bot');
            }, 500);
        }
    });
}

// Add chat message to the interface
function addChatMessage(message, sender)
{
    const chatMessagesContainer = document.getElementById('chat-messages');
    
    // Remove welcome message if it exists
    const welcomeMsg = chatMessagesContainer.querySelector('.welcome-message');
    if (welcomeMsg)
    {
        welcomeMsg.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    messageDiv.innerHTML = `
        <div class="message-bubble">${message}</div>
        <div class="message-time">${timeString}</div>
    `;

    chatMessagesContainer.appendChild(messageDiv);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

    // Store in chat messages array
    chatMessages.push({
        message: message,
        sender: sender,
        timestamp: timeString
    });
}

// Generate bot response (replace with actual API call)
function generateBotResponse(userMessage)
{
    const responses = [
        "That's an interesting question! Let me help you with that.",
        "I understand what you're asking. Here's what I think...",
        "Great question! Based on what you've shared, I'd suggest...",
        "I can help you with that. Let me explain...",
        "That's a good point. Here's my perspective on it..."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + " " + 
           "This is a demo response. In production, this would connect to your chatbot API.";
}

// Show welcome message
function showWelcomeMessage()
{
    const chatMessagesContainer = document.getElementById('chat-messages');
    chatMessagesContainer.innerHTML = `
        <div class="welcome-message">
            <div style="font-size: 48px; margin-bottom: 16px;">👋</div>
            <div style="font-size: 18px; font-weight: 500; color: #667eea; margin-bottom: 8px;">Welcome to Chat Assistant!</div>
            <div>Start a conversation by typing a message below.</div>
        </div>
    `;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeUI);
