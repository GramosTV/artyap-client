<script setup lang="ts">
import { Artwork } from '@/types/artwork';
import { Comment } from '@/types/comment';
import { getCsrf } from '@/utils/getCsrf';
import CommentItem from '@/components/CommentItem.vue';
import axios from 'axios';
import { ref, onMounted, computed, defineProps } from 'vue';
import { inject, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Loader from '@/components/Loader.vue';
const auth = useAuthStore();
auth.fetchUser();
const props = defineProps<{
  id?: number;
}>();

const artwork = ref<Artwork | null>(null);
const image = ref<string | null>(null);
const imageZoom = ref<string | null>(null);
const imageUrl = computed(() => image.value || '');
const imageZoomUrl = computed(() => imageZoom.value || '');
const otherArtworks = ref<string[]>([]);
const commentsRef = ref<Comment[]>([]);
const art_url = process.env.VUE_APP_ART_URL;
const newCommentText = ref<string>('');
const country = ref<{ flags: { png: string } }>();
const randomizeEvent = inject('randomizeEvent') as object;
const fetchCountry = async (place: string) => {
  try {
    const data = await fetch(`https://restcountries.com/v3.1/name/${place}`).then((res) => res.json());
    country.value = data[0];
  } catch (err) {
    console.error(err);
  }
};
const fetchArtwork = async () => {
  try {
    const url = props.id ? `artwork/${props.id}` : 'random-artwork/';
    const response = await fetch(`${process.env.VUE_APP_API_URL}/${url}`);
    const { data, other_artworks, comments }: { data: Artwork; other_artworks: string[]; comments: Comment[] } =
      await response.json();

    const infoResponse = await fetch(`${art_url}/${data.image_id}/info.json`);
    const { width } = await infoResponse.json();

    image.value = `${art_url}/${data.image_id}/full/${width >= 843 ? 843 : width},/0/default.jpg`;
    imageZoom.value = `${art_url}/${data.image_id}/full/${width},/0/default.jpg`;
    commentsRef.value = comments;
    artwork.value = data;
    otherArtworks.value = other_artworks;

    if (data.place_of_origin) {
      await fetchCountry(data.place_of_origin);
    }
  } catch (error) {
    console.error(error);
  }
};
watch(randomizeEvent, fetchArtwork);

onMounted(fetchArtwork);

const submitComment = async () => {
  if (!newCommentText.value.trim()) {
    return;
  }

  try {
    const response = await axios.post(
      `${process.env.VUE_APP_API_URL}/add-comment`,
      {
        text: newCommentText.value,
        artwork_id: artwork.value?.id,
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
      commentsRef.value.push(response.data);
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
  <div v-if="artwork" class="container">
    <!-- Left Side: Image & Description -->
    <div class="left">
      <div class="img-container">
        <vue-image-zoomer
          :regular="imageUrl"
          :zoom="imageZoomUrl"
          :zoom-amount="3"
          :show-message="false"
          :show-message-touch="false"
          img-class="img"
        >
        </vue-image-zoomer>
      </div>
      <h2>{{ artwork?.title || 'Untitled' }}</h2>
      <p class="description" v-if="artwork.description">{{ artwork.description }}</p>
      <div class="country" v-if="country">
        <p><b>Place of origin: </b> {{ artwork.place_of_origin }}</p>
        <img :src="country.flags.png" alt="" />
      </div>
      <p v-if="typeof artwork.date_start === 'number' || typeof artwork.date_end === 'number'">
        <b>Creation year{{ Math.abs(artwork.date_start - artwork.date_end) > 1 ? 's' : null }}:</b>
        {{
          Math.abs(artwork.date_start - artwork.date_end) > 1
            ? `${artwork.date_start} - ${artwork.date_end}`
            : artwork.date_start
        }}
      </p>
      <p v-if="artwork.material_titles && JSON.parse(artwork.material_titles).length">
        <b>Materials:</b> {{ JSON.parse(artwork.material_titles).join(', ') }}
      </p>
      <p v-if="artwork.technique_titles && JSON.parse(artwork.technique_titles).length">
        <b>Techniques:</b> {{ JSON.parse(artwork.technique_titles).join(', ') }}
      </p>
      <p v-if="artwork.theme_titles && JSON.parse(artwork.theme_titles).length">
        <b>Themes:</b> {{ JSON.parse(artwork.theme_titles).join(', ') }}
      </p>
      <p v-if="artwork.section_titles && JSON.parse(artwork.section_titles).length">
        <b>Sections:</b> {{ JSON.parse(artwork.section_titles).join(', ') }}
      </p>

      <!-- Discussion Section -->
      <div class="discussion">
        <h3>Discussion</h3>
        <ul>
          <CommentItem
            v-for="comment in commentsRef"
            :key="comment.id"
            :comment="comment"
            :userIsLoggedIn="auth.isLoggedIn()"
          />
        </ul>

        <!-- Add Comment Form -->
        <div v-if="auth.isLoggedIn()" class="add-comment">
          <textarea v-model="newCommentText" placeholder="Add a comment..." rows="1"></textarea>
          <button @click="submitComment"><i class="fa-regular fa-paper-plane"></i></button>
        </div>
        <div v-else>
          <router-link to="/login">Log in to join the discussion</router-link>
        </div>
      </div>
    </div>

    <!-- Right Side: Artist Info -->
    <div class="right">
      <div class="artist-info">
        <!-- <img :src="artwork.artist.avatar" class="avatar" /> -->
        <h3>{{ artwork.artist?.title || 'Unknown Author' }}</h3>
        <p v-if="typeof artwork.artist?.birth_date === 'number' || typeof artwork.artist?.death_date === 'number'">
          {{ artwork.artist?.birth_date || '' }} - {{ artwork.artist?.death_date || '' }}
        </p>
        <p v-if="typeof artwork.artist?.description === 'string'">{{ artwork.artist?.description }}</p>
      </div>
      <ul>
        <li v-for="artwork in otherArtworks" :key="artwork">
          <img :src="`${art_url}/${artwork}/full/400,/0/default.jpg`" alt="" />
        </li>
      </ul>
    </div>
  </div>
  <div class="loader-container" v-else>
    <Loader />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: 20px;
  margin-top: 20px;
}

.loader-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.left {
  flex: 2;
  margin-bottom: 20vh;
  min-width: 843px;
  p {
    margin: 8px 0;
  }
  h2 {
    margin: 10px 0;
    margin-bottom: 5px;
  }
  .country {
    display: flex;
    align-items: center;
    p {
      margin: 0;
    }
    img {
      height: 16px;
      margin-left: 5px;
    }
  }
  .discussion {
    background-color: $text-color;
    color: $primary-color;
    padding: 15px;
    margin-top: 30px;
    border-radius: 6px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

    a {
      color: $primary-color;
    }

    h3 {
      font-size: 1.5rem;
    }

    .add-comment {
      display: flex;
      margin-top: 15px;
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
        width: 320px;
        resize: none;
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

    ul {
      list-style: none;
      li {
        margin: 10px 0;
        div {
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
}

.right {
  flex: 1;
  background: $primary-color;
  padding: 20px;
  color: $text-color;
  // border-radius: 10px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  ul {
    list-style: none;
    li {
      margin: 10px 0;
    }
  }
}

.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  width: max-content;
  margin: 0 auto;
}

.artist-info {
  text-align: center;
  margin-bottom: 20px;
}
</style>
