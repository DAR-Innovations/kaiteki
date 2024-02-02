from functools import lru_cache
from typing import Any
from schemas import settings_schema

import yaml

def load_from_yaml() -> Any:
    with open("application.yaml") as fp:
        config = yaml.safe_load(fp)
    return config


@lru_cache()
def get_settings() -> settings_schema.Settings:
    yaml_config = load_from_yaml()
    settings = settings_schema.Settings(**yaml_config)
    return settings