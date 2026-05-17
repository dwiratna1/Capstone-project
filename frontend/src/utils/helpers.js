/**
 * Utility helper functions for ModalIn.
 */

/**
 * Format number to Indonesian Rupiah.
 * @param {number} amount
 * @returns {string} Formatted currency string
 */
export const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date to Indonesian locale.
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Get score status label based on score value.
 * @param {number} score
 * @returns {string} Status label
 */
export const getScoreStatus = (score) => {
  if (score >= 80) return 'Sangat Baik';
  if (score >= 65) return 'Baik';
  if (score >= 50) return 'Cukup';
  return 'Kurang';
};
