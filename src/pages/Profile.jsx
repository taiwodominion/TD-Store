import { useApp } from "../contexts/AppContext";
import UserProfile from "../components/UserProfile"

const Profile = () => {
  const { user, allProducts, favorites, toggleFavorite, addToCart } = useApp();

  return (
    <UserProfile 
      user={user} 
      allProducts={allProducts} 
      favorites={favorites} 
      toggleFavorite={toggleFavorite} 
      onAddToCart={addToCart} 
    />
  );
};

export default Profile;