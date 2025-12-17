import os
from dotenv import load_dotenv
from typing import Optional

# Load environment variables from .env file
load_dotenv()


class Settings:
    """
    Application settings loaded from environment variables
    """
    # OpenAI Configuration
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")

    # Qdrant Cloud Configuration
    qdrant_url: str = os.getenv("QDRANT_URL", "")
    qdrant_api_key: Optional[str] = os.getenv("QDRANT_API_KEY")
    qdrant_collection_name: str = os.getenv("QDRANT_COLLECTION_NAME", "ai_book")

    # Neon Postgres Configuration
    neon_db_url: str = os.getenv("NEON_DB_URL", "")

    # Application Configuration
    debug: bool = os.getenv("DEBUG", "False").lower() == "true"
    source_dir: str = os.getenv("SOURCE_DIR", "./website/docs")

    @property
    def is_configured(self) -> bool:
        """
        Check if all required environment variables are set
        """
        return bool(
            self.openai_api_key
            and self.qdrant_url
            and self.neon_db_url
        )

    def get(self, key: str, default=None):
        """
        Get a configuration value with optional default
        """
        return getattr(self, key, default)


# Create a global settings instance
settings = Settings()