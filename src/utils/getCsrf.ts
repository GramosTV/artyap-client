export async function getCsrf(): Promise<string> {
  try {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/csrf`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch CSRF token');
    }

    const data = await response.json();
    return data.csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    return '';
  }
}
