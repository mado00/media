import { useFetchAlbumsQuery } from '../store';

function AlbumsList({ user }) {
  // we can just call this hook, then immediatery try to fetch some data
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
 
  
  console.log(data, error, isLoading);

  return <div>Albums for {user.name}</div>;
}

export default AlbumsList;
