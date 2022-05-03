import { gql } from '@apollo/client';

export const GET_USER_PLAYLISTS = gql`
  query UserPlaylists($userId: ID!) {
    userPlaylists(userId: $userId) {
      id
      name
      userMade
      tracks {
        name
        preview_url
        duration_ms
        id
        album {
          name
          id
          images {
            url
          }
        }
        artists {
          id
          name
        }
        type
      }
    }
  }
`;

export const getPlaylistsQuery = async (getUserPlaylists) => {
  try {
    const { data } = await getUserPlaylists({
      variables: {
        userId: JSON.parse(localStorage.getItem('user'))?.id,
      },
    });

    return data?.userPlaylists;
  } catch (e) {
    console.log(e);
  }

  //  setUserPlaylists((prevState) => userPlaylists);
};
