from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class ChatConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_apps.chat"
    verbose_name = _("Chat")

    def ready(self):
        import core_apps.chat.signals  # noqa: F401
