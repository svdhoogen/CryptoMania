<template>
    <div>
        <div v-for="message in messages" :key="message.id" :class="message.type" class="alert alert-dismissible fade show" role="alert">
            {{ message.text }}
            <button v-if="message.dismissable" type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</template>

<script>    
    export default {
        name: "notifications",

        data() {
            return {
                messages: []
            }
        },

        methods: {
            // Adds a message to notify user of something
            AddMessage(message, type, dismissable) {
                console.log("Showing new message to user!");

                // New message
                var newMessage = [];

                // Set message data
                newMessage.id = this.messages.length + message;
                newMessage.dismissable = dismissable;
                newMessage.text = message;
                newMessage.type = type;

                // Add message to messages
                this.messages.push(newMessage);

                // Remove message after 5 seconds
                setTimeout(() => {
                    this.RemoveMessage(newMessage.id);
                }, 5000);
            },

            // Removes a message
            RemoveMessage(id) {
                console.log("Removing old message!");

                this.messages.splice(this.messages.findIndex(message => message.id == id), 1);
            },

            // Removes all messages
            ClearMessages() {
                this.messages = [];
            }
        }
    }
</script>