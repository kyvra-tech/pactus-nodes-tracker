export const setTheme = (isDarkMode: boolean) => {
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

export const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    return savedTheme === 'dark';
  }

  // IF NO SAVED THEME, USE THE SYSTEM PREFERENCE
  const usePrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return usePrefersDark;
};