import { JSDOM } from 'jsdom';

import IArticlesRepository from '@modules/technewsSource/repositories/IArticlesRepository';
import IShowPostDTO from '@modules/technewsSource/dtos/IShowPostDTO';
import IResponseHomeDTO from '@modules/technewsSource/dtos/IResponseHomeDTO';
import Article from '@modules/technewsSource/dtos/Article';

const fakeAlias = 'OlharDigital';

class OlharDigital implements IArticlesRepository {
  getOriginUrl() {
    return 'https://olhardigital.com.br';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromFile(`./src/assets/fakes/html/technews-source/home/${fakeAlias}.html`);
    const { document } = response.window;

    const getContent = (elPost: Element) => ({
      link: elPost.getAttribute('href'),
      title: elPost.getAttribute('title'),
      thumb: elPost.querySelector('img')?.getAttribute('src'),
      // preview: '',
      created_at: '',
    });

    const postsData = [...document.querySelectorAll('.od-posts .od-post'),]
      .map((elPost) => getContent(elPost));

    return { posts: postsData };
  }

  async getPost({ url }: IShowPostDTO): Promise<Article> {
    const response = await JSDOM.fromFile(`./src/assets/fakes/html/technews-source/post/${fakeAlias}.html`);
    const { document } = response.window;

    const link = document
      .querySelector('meta[property="og:url"]')
      ?.getAttribute('content');

    const title = document.querySelector('meta[property="og:description"]')?.getAttribute('content');

    const thumb = document
      .querySelector('meta[property="og:image"]')
      ?.getAttribute('content');

    const created_at = document.querySelector('meta[property="article:published_time"]')?.getAttribute('content');

    const getContent = (el: Element) => {
      if (
        el.querySelector('img') !== null
        && el.querySelector('img')?.getAttribute('src')
      ) {
        const imgSrc = this.getOriginUrl() + el
          .querySelector('img')
          ?.getAttribute('src')

        const [img] = String(imgSrc).split(' ');
        if (img !== thumb) {
          // return {
          //  type: 'image',
          //  content: img,
          // };
        }
        return {};
      }
      if (el.querySelector('.video-container') !== null) {
        return {
          type: 'video',
          content: el
            .querySelector('.video-container iframe')
            ?.getAttribute('data-src'),
        };
      }
      if (
        el.tagName === 'P'
        && el.getAttribute('class') === null
        && el.getAttribute('id') === null
      ) {
        return { type: 'text', content: el.textContent };
      }
      if (el.tagName === 'H3') {
        return { type: 'text-highlighted', content: el.textContent };
      }
      return {};
    };

    const contents = [...document.querySelectorAll('.od-art-content *')]
      .map(elPost => getContent(elPost))
      .map(dataPost => ({
        type: String(dataPost.type),
        value: String(dataPost.content),
      }));

    const post = {
      link: String(link),
      title: String(title),
      thumb: String(thumb),
      contents,
      created_at: new Date(created_at ? created_at : ''),
    };

    return post;
  }
}

export default OlharDigital;
