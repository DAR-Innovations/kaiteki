from functools import lru_cache
from typing import Any

import yaml
from dotenv import load_dotenv

from schemas.settings_schema import Settings

load_dotenv()


def load_from_yaml() -> Any:
    with open("application.yaml") as fp:
        config = yaml.safe_load(fp)
    return config


@lru_cache()
def get_settings() -> Settings:
    yaml_config = load_from_yaml()
    settings = Settings(**yaml_config)
    return settings
