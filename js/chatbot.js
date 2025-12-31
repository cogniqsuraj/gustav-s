// Gustav's Chatbot Interface with Gemini AI
// Handles user interactions and message display

// API Configuration
// Option 1: Direct Gemini API (for development)
const GEMINI_API_KEY = 'AIzaSyAHDFRXu553iYRYaOSx5KhIt72h-tu4KHc';
const MODEL_NAME = 'gemma-3-4b-it';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

// Option 2: Cloudflare Worker (for production - uncomment and add your worker URL)
// const WORKER_URL = 'https://gustavs-chatbot.your-subdomain.workers.dev';
const WORKER_URL = null; // Set to your Cloudflare Worker URL when deployed

// Restaurant context for AI
const RESTAURANT_CONTEXT = `
You are a warm and welcoming assistant for Gustav's, a legendary Bavarian-style tavern and beer garden in Leavenworth, WA.

Hospitable Info:
- Location: 617 US-2, Leavenworth, WA 98826 (Heart of the village!).
- Services: Longtime tavern serving signature pub grub (giant pretzels, brats, schnitzel) and our own Icicle Ales.
- Atmosphere: Stunning Cascade Mountain views and a cozy indoor stone fireplace.
- Bookings: We are a high-volume spot! Use the "Find a table" button on our site for the waitlist/reservations, or "Order online" for takeaway.
- Contact: office@gustavsleavenworth.com | +1 509-548-4509

Personality:
- **Warm & Welcoming**: Embody Bavarian hospitality! Use friendly language (e.g., "Welcome!," "We'd love to have you," "Prost!").
- **Concise & Helpful**: Keep responses to 1-2 short, snappy sentences.
- **Proactive**: If they ask about seating, mention our fireplace or grand mountain views.
- **Navigation Buttons**: When relevant, suggest navigation buttons using the format: BUTTON[Label|URL].
- Available Pages: Menu (menu.html), Drinks (drinks.html), Hours (index.html#location), Jobs (jobs.html), Gift Cards (giftcards.html).
- Example: "Prost! BUTTON[View Menu|menu.html] BUTTON[View Hours|index.html#location]"
- Use dashes for lists, no stars.
`;

const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotToggleIcon = document.getElementById('chatbot-toggle-icon');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const quickReplies = document.querySelectorAll('.quick-reply');
const chatbotNotification = document.querySelector('.chatbot-notification');
const chatbotFab = document.getElementById('chatbot-fab');
const chatbotClear = document.getElementById('chatbot-clear');

// Toggle chatbot window
chatbotToggle.addEventListener('click', () => {
    // Open chat window and hide the toggle button
    chatbotWindow.classList.add('active');

    // Hide the toggle button immediately when clicked
    if (chatbotToggle) {
        chatbotToggle.style.display = 'none';
    }

    // Focus on input
    chatbotInput.focus();

    // Remove notification badge
    if (chatbotNotification) {
        chatbotNotification.style.display = 'none';
    }

    // Also hide the FAB when chat is opened via toggle
    if (chatbotFab) {
        chatbotFab.style.display = 'none';
    }
});

// Close chatbot
chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
    showChatbotFab();
});

// Show/hide toggle and fab
function showChatbotFab() {
    if (chatbotFab) chatbotFab.style.display = 'flex';
    if (chatbotToggle) chatbotToggle.style.display = 'none';
}

function hideBothButtons() {
    if (chatbotFab) chatbotFab.style.display = 'none';
    if (chatbotToggle) chatbotToggle.style.display = 'none';
}

function showChatbotToggle() {
    if (chatbotFab) chatbotFab.style.display = 'none';
    if (chatbotToggle) chatbotToggle.style.display = 'flex';
}

// When fab is clicked, open chat and hide both buttons
if (chatbotFab) {
    chatbotFab.addEventListener('click', () => {
        chatbotWindow.classList.add('active');
        hideBothButtons(); // Hide both buttons when chat is open
        chatbotInput.focus();
        if (chatbotNotification) chatbotNotification.style.display = 'none';
    });
}

// Add message to chat
function addMessage(text, isBot = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isBot ? 'message bot-message' : 'message user-message';

    if (isBot) {
        // Replace markdown stars at line start with dashes for lists
        let cleanText = text.replace(/^\s*\*+/gm, '-');

        // Parse BUTTON[Label|URL] pattern
        const buttonRegex = /BUTTON\[([^|]+)\|([^\]]+)\]/g;
        let actionButtonsHtml = '';
        let match;

        while ((match = buttonRegex.exec(cleanText)) !== null) {
            const label = match[1];
            const url = match[2];
            actionButtonsHtml += `<a href="${url}" class="chatbot-action-btn">${label}</a>`;
        }

        // Remove the BUTTON[...] tags from the visible text
        const displayText = cleanText.replace(buttonRegex, '').trim();

        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="assets/gustavs-logo.png" alt="Bot">
            </div>
            <div class="message-content">
                <p>${displayText.replace(/\n/g, '<br>')}</p>
                ${actionButtonsHtml ? `<div class="message-actions">${actionButtonsHtml}</div>` : ''}
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
    }

    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Show quick replies after bot response
    if (isBot) {
        showQuickReplies();
    }
}

// Show quick reply buttons
function showQuickReplies() {
    const quickRepliesContainer = document.getElementById('quick-replies');
    if (quickRepliesContainer) {
        quickRepliesContainer.style.display = 'flex';
    }
}

// Hide quick reply buttons
function hideQuickReplies() {
    const quickRepliesContainer = document.getElementById('quick-replies');
    if (quickRepliesContainer) {
        quickRepliesContainer.style.display = 'none';
    }
}

// Call Gemini API (direct or via Cloudflare Worker)
async function callGeminiAPI(userMessage) {
    try {
        let response;

        // Use Cloudflare Worker if configured, otherwise direct API
        if (WORKER_URL) {
            response = await fetch(WORKER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage })
            });

            if (!response.ok) {
                throw new Error('Worker request failed');
            }

            const data = await response.json();
            return data.response;
        } else {
            // Direct Gemini API call
            response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${RESTAURANT_CONTEXT}\n\nUser question: ${userMessage}\n\nPlease provide a helpful response:`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.4,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 128,
                    }
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();

            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Invalid response format');
            }
        }
    } catch (error) {
        console.error('Gemini API Error:', error);
        // Fallback to local response
        return getBotResponse(userMessage);
    }
}

// Handle sending message
async function sendMessage() {
    const message = chatbotInput.value.trim();

    if (!message) return;

    // Hide quick replies while processing
    hideQuickReplies();

    // Add user message
    addMessage(message, false);
    chatbotInput.value = '';

    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <img src="assets/gustavs-logo.png" alt="Bot">
        </div>
        <div class="message-content">
            <p>Typing...</p>
        </div>
    `;
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Check if Gemini API key is configured
    if (GEMINI_API_KEY && GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY') {
        // Use Gemini AI
        const response = await callGeminiAPI(message);
        typingDiv.remove();
        addMessage(response, true);
    } else {
        // Use local fallback
        setTimeout(() => {
            typingDiv.remove();
            const response = getBotResponse(message);
            addMessage(response, true);
        }, 800);
    }
}

// Clear chat history
function clearChat() {
    // Keep only the first bot message (welcome message)
    const messages = chatbotMessages.querySelectorAll('.message');
    if (messages.length > 1) {
        // Remove all but the first message
        for (let i = 1; i < messages.length; i++) {
            messages[i].remove();
        }
        // Small feedback
        console.log('Chat cleared');
    }
}

// Clear button click
if (chatbotClear) {
    chatbotClear.addEventListener('click', clearChat);
}

// Send button click
chatbotSend.addEventListener('click', sendMessage);

// Enter key press
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Quick reply buttons
quickReplies.forEach(button => {
    button.addEventListener('click', () => {
        const message = button.getAttribute('data-message');
        chatbotInput.value = message;
        sendMessage();
    });
});

// Show welcome message after a delay
setTimeout(() => {
    if (chatbotNotification && !chatbotWindow.classList.contains('active')) {
        chatbotNotification.style.display = 'flex';
    }
}, 3000);

// On page load, show toggle, hide fab
showChatbotToggle();
// Initialize: Parse the initial hardcoded message if it contains buttons
document.addEventListener('DOMContentLoaded', () => {
    const firstBotMessage = document.querySelector('.bot-message .message-content p');
    if (firstBotMessage && firstBotMessage.textContent.includes('BUTTON[')) {
        const text = firstBotMessage.textContent;
        const buttonRegex = /BUTTON\[([^|]+)\|([^\]]+)\]/g;
        let actionButtonsHtml = '';
        let match;

        while ((match = buttonRegex.exec(text)) !== null) {
            const label = match[1];
            const url = match[2];
            actionButtonsHtml += `<a href="${url}" class="chatbot-action-btn">${label}</a>`;
        }

        const displayText = text.replace(buttonRegex, '').trim();
        firstBotMessage.innerHTML = displayText.replace(/\n/g, '<br>');

        if (actionButtonsHtml) {
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'message-actions';
            actionsDiv.innerHTML = actionButtonsHtml;
            firstBotMessage.parentElement.appendChild(actionsDiv);
        }
    }
});
