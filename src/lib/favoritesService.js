'use client';

export const getFavorites = () => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('favoriteEvents')) || [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
};

export const toggleFavorite = (event) => {
  const favorites = getFavorites();
  const existingIndex = favorites.findIndex(fav => fav.id === event.id);
  let newFavorites;

  if (existingIndex >= 0) {
    newFavorites = favorites.filter(fav => fav.id !== event.id);
  } else {
    newFavorites = [...favorites, event];
  }

  localStorage.setItem('favoriteEvents', JSON.stringify(newFavorites));
  window.dispatchEvent(new Event('storage'));
  return newFavorites;
};

export const isFavorite = (eventId) => {
  return getFavorites().some(fav => fav.id === eventId);
};