<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { Comment } from '@/types/comment';
import axios from 'axios';
import { getCsrf } from '@/utils/getCsrf';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';

const auth = useAuthStore();
auth.fetchUser();

const props = defineProps<{ comment: Comment; userIsLoggedIn: boolean }>();

const newCommentText = ref<string>('');
const isReplying = ref(false);

const toggleReply = () => {
  if (!auth.isLoggedIn()) {
    router.push({ path: '/login' });
    return;
  }
  isReplying.value = !isReplying.value;
};

const submitComment = async () => {
  if (!newCommentText.value.trim()) {
    return;
  }

  try {
    const response = await axios.post(
      `${process.env.VUE_APP_API_URL}/add-comment`,
      {
        text: newCommentText.value,
        artwork_id: props.comment.artwork,
        parent_comment_id: props.comment.id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': await getCsrf(),
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      //   TODO: Add new comment to parent comment's replies
      newCommentText.value = '';
    } else {
      console.error('Failed to submit comment');
    }
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
};
</script>

<template>
  <li v-if="comment" class="comment" :class="{ 'has-parent': comment.parent !== null }">
    <div class="comment-header">
      <strong>{{ comment.user.username }}</strong>
      <strong>
        {{ new Date(comment.created_at).toLocaleDateString() }}
        {{ new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
      </strong>
    </div>
    <p>{{ comment.text }}</p>
    <span class="reply" @click="toggleReply">Reply</span>

    <div v-if="userIsLoggedIn && isReplying" class="add-comment">
      <textarea v-model="newCommentText" :placeholder="`Replying to: ${comment.user.username}`" rows="1"></textarea>
      <button @click="submitComment"><i class="fa-regular fa-paper-plane"></i></button>
    </div>

    <ul v-if="comment.replies.length">
      <CommentItem v-for="reply in comment.replies" :key="reply.id" :comment="reply" :userIsLoggedIn="userIsLoggedIn" />
    </ul>
  </li>
</template>

<style lang="scss" scoped>
.comment {
  margin-top: 10px;
  &.has-parent {
    border-left: 2px solid $primary-color;
    padding-left: 15px;
  }
  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .reply {
    cursor: pointer;
    display: inline-block;
    margin-top: 2px;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  ul {
    list-style: none;
    li {
      margin: 10px 0;
      .comment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      p {
        margin: 2px 0;
      }
      span {
        font-size: 0.8rem;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
}

.add-comment {
  display: flex;
  margin-top: 5px;
  textarea {
    padding: 10px;
    border-radius: 6px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border: 2px solid $secondary-color;
    border-right: 0px;
    background-color: $primary-color;
    color: $text-color;
    field-sizing: content;
    resize: none;
    width: 320px;
    &:focus {
      outline: none;
    }
  }
  button {
    padding: 10px;
    border-radius: 12px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    cursor: pointer;
    border: 2px solid $secondary-color;
    background-color: $secondary-color;
    color: $text-color;
    transition: 0.2s;
    &:hover {
      color: $secondary-color;
      background-color: $text-color;
      transition: 0.2s;
    }
  }
}
</style>
