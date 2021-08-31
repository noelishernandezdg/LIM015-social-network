// importamos la funcion que vamos a testear
import MockFirebase from 'mock-cloud-firestore';
import {
  getPosts, deletePost,
  updatePost, updateLoves,
} from '../src/firebase/firebase-firestore.js';

const data = {
  __collection__: {
    posts: {
      __doc__: {
        a1b2c3: {
          author: 'Rosa',
          id: 'user1',
          likes: [],
          mail: 'rosita@gmail.com',
          post: 'hello!',
          privacyUserPost: false,
          time: '29 de agosto de 2021, 16:50:02 UTC-5',
        },
        a2b2c3: {
          author: 'Maria',
          id: 'user2',
          likes: [{
            userEmail: 'rosita@gmail.com',
            userID: 'user1',
          }],
          mail: 'rm@gmail.com',
          post: 'Hola!!',
          privacyUserPost: false,
          time: '28 de agosto de 2021, 16:43:02 UTC-5',
        },
        a3b2c3: {
          author: 'Lupe',
          id: 'user3',
          likes: [{
            userEmail: 'rosita@gmail.com',
            userID: 'user1',
          }, {
            userEmail: 'rm@gmail.com',
            userID: 'user2',
          }],
          mail: 'lupita@gmail.com',
          post: 'Quiero compartir algo',
          privacyUserPost: false,
          time: '29 de agosto de 2021, 16:43:02 UTC-5',
        },
        a3b3c3: {
          author: 'Juana',
          id: 'user4',
          likes: [{
            userEmail: 'rosita@gmail.com',
            userID: 'user1',
          }, {
            userEmail: 'rm@gmail.com',
            userID: 'user2',
          }, {
            userEmail: 'lupita@gmail.com',
            userID: 'user3',
          }],
          mail: 'juanitalahuerfanita@gmail.com',
          post: 'como estan?',
          privacyUserPost: false,
          time: '01 de agosto de 2021, 12:43:02 UTC-5',
        },
      },
    },
  },
};

// Ponemos 'isNaiveSnapshotListenerEnabled: true' para que onSnapshot se dispare en cualquier cambio
global.firebase = new MockFirebase(data, { isNaiveSnapshotListenerEnabled: true });

describe('getPosts', () => {
  it('getPosts deberia ser una función', () => {
    expect(typeof getPosts).toBe('function');
  });
  it('al ejecutarse getPosts deberia retornar un objeto', () => {
    getPosts().then((docRef) => {
      docRef.forEach((docAboutCollection) => {
        const postInfo = docAboutCollection.data();
        expect(typeof postInfo).toBe('object');
      });
    });
  });
  it('getPosts debe obtener los posts en forma descendente', () => {
    const result = {
      a1b2c3: {
        author: 'Rosa',
        id: 'user1',
        likes: [],
        mail: 'rosita@gmail.com',
        post: 'hello!',
        privacyUserPost: false,
        time: '29 de agosto de 2021, 16:50:02 UTC-5',
      },
      a3b2c3: {
        author: 'Lupe',
        id: 'user3',
        likes: [{
          userEmail: 'rosita@gmail.com',
          userID: 'user1',
        }, {
          userEmail: 'rm@gmail.com',
          userID: 'user2',
        }],
        mail: 'lupita@gmail.com',
        post: 'Quiero compartir algo',
        privacyUserPost: false,
        time: '29 de agosto de 2021, 16:43:02 UTC-5',
      },
      a2b2c3: {
        author: 'Maria',
        id: 'user2',
        likes: [{
          userEmail: 'rosita@gmail.com',
          userID: 'user1',
        }],
        mail: 'rm@gmail.com',
        post: 'Hola!!',
        privacyUserPost: false,
        time: '28 de agosto de 2021, 16:43:02 UTC-5',
      },
      a3b3c3: {
        author: 'Juana',
        id: 'user4',
        likes: [{
          userEmail: 'rosita@gmail.com',
          userID: 'user1',
        }, {
          userEmail: 'rm@gmail.com',
          userID: 'user2',
        }, {
          userEmail: 'lupita@gmail.com',
          userID: 'user3',
        }],
        mail: 'juanitalahuerfanita@gmail.com',
        post: 'como estan?',
        privacyUserPost: false,
        time: '01 de agosto de 2021, 12:43:02 UTC-5',
      },
    };
    getPosts().then((docRef) => {
      docRef.forEach((docAboutCollection) => {
        const postInfo = docAboutCollection.data();
        expect(postInfo).toEqual(result);
      });
    });
  });
});

describe('deletePost', () => {
  it('deletePost debería ser una función', () => {
    expect(typeof deletePost).toBe('function');
  });
  it('deletePost debería borrar el post con id:a3b3c3', () => {
    deletePost('a3b3c3')
      .then((postInfo) => {
        expect(postInfo).toBe(undefined);
        getPosts();
      });
  });
});

describe('updatePost', () => {
  it('updatePost deberia ser una función', () => {
    expect(typeof updatePost).toBe('function');
  });
  it('post con id: a1b2c3 deberia cambiar su post a hola mundo', () => {
    const posts = getPosts;
    posts.forEach((post) => {
      if (post.id === 'a1b2c3') {
        updatePost('a1b2c3', 'hola mundo')
          .then(() => {
            const result = post.data();
            expect(result.post).toBe('hola mundo');
          });
      }
    });
  });
});

// describe('updateLoves', () => {
//   it('updateLoves debería ser una función', () => {
//     expect(typeof updateLoves).toBe('function');
//   });
//   it('dar likes al post con id: a2b2c3', () => {
//     const posts = getPosts;
//     posts.forEach((post) => {
//       if (post.id === 'a2b2c3') {
//         const arrLikes = post.data().likes;
//         updateLoves('a2b2c3', arrLikes)
//           .then(() => {
//             const result = post.data();
//             expect(result.likePost).toBe(1);
//           });
//       }
//     });
//   });
// });
