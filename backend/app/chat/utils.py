from django.core.cache import cache
from datetime import timedelta
import hashlib
import re


def generate_cache_key(query):
    """
    Generate a unique cache key by normalizing the query text. This involves:
    - Removing all whitespace (spaces, tabs, new lines).
    - Lowercasing the text.
    - Hashing the result.
    :param query: The query sentence to be used as the base for the cache key.
    :return: A hashed string representing the cache key.
    """
    # Normalize the query by removing all whitespace characters and making it lowercase
    normalized_query = re.sub(r'\s+', '', query).lower()
    # Hash the normalized query
    return hashlib.sha256(normalized_query.encode('utf-8')).hexdigest()


def cache_text(query, text):
    """
    Cache text data for 60 days, using a hashed query sentence as the cache key.
    :param query: The query sentence to be used for generating the cache key.
    :param text: The text to be cached.
    """
    key = generate_cache_key(query)
    cache.set(key, text, timeout=timedelta(days=60).total_seconds())


def retrieve_cached_text(query):
    """
    Retrieve cached text data using a hashed query sentence as the cache key.
    :param query: The query sentence to be used for generating the cache key.
    :return: Cached text if exists, None otherwise.
    """
    key = generate_cache_key(query)
    return cache.get(key)