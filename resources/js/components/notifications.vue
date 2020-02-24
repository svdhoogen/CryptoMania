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
            // Adds a message to messages array to notify user of whatever
            AddMessage(message, type, dismissable) {
                console.log("Showing new message to user!");

                var newMessage = [];

                // Set message data
                newMessage.dismissable = dismissable;
                newMessage.id = this.messages.length + message;
                newMessage.text = message;
                newMessage.type = type;

                // Add message to array
                this.messages.push(newMessage);

                setTimeout(() => {
                    this.RemoveMessage(newMessage.id);
                }, 5000);
            },

            //Removes a message from array
            RemoveMessage(id) {
                console.log("Removing message due to timeout!");
                this.messages.splice(this.messages.findIndex(message => message.id == id), 1);
            }
        }
    }
</script>