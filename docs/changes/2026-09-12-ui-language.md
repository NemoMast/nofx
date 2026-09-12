# Chinese and English UI

## Scope

Restore the existing React language context and dictionaries. Default to Simplified Chinese, provide a persistent Chinese/English switch on desktop, mobile, and authentication screens, and translate visible interface labels, descriptions, empty states, forms, and errors in the active application routes.

Keep exchange symbols, product/model names, API identifiers, user-authored content, and model prompts unchanged. This change must not modify trading behavior or translate executable strategy configuration.

## Implementation Plan

- [x] Restore reactive language selection, safe persistence, HTML language metadata, and accessible switcher; replace the former English-only tests with behavior tests.
- [x] Translate strategy, settings, dashboards, terminal and market views using the existing local translation patterns.
- [x] Translate trader configuration, launch guidance, wallet UI, authentication and common navigation; retain English counterparts.
- [x] Run focused tests, the frontend suite/build, and Chinese/English browser checks including narrow layouts and refresh persistence.
- Version publication: publish the verified commit to the personal fork's `dev` branch and retain `codex/chinese-english-ui` for this change.

## Versioning

Use `NemoMast/nofx` as the personal GitHub fork, with the original repository retained as upstream. Each completed, validated change gets a descriptive commit and is pushed to the personal repository. Local runtime files, .env, credentials, databases, and build outputs stay ignored.

## Notes

The previous English-only build wrote `language=en` automatically. A new `nofx-ui-language` key distinguishes deliberate user preferences from that legacy forced value. Missing or invalid preferences default to Chinese; blocked storage does not prevent switching in the current session.

The frontend supplies Chinese labels, guidance, FAQ answers and interface errors. Product names, exchange symbols, API identifiers, user-created content and external AI output remain unchanged. The language selected for the interface does not rewrite the strategy's model instructions.

## Verification

- Frontend unit/component suite passes, including language persistence, blocked browser storage, terminal labels, FAQ search/content, onboarding wallet preservation and launch error localization.
- TypeScript and Vite production build pass.
- Browser checks cover Chinese trader setup, model configuration, leaderboard, FAQ and login screens; English switching survives reload. Desktop (1440px) and narrow (390px) layouts were inspected.
- Review confirmed that numeric trading values, wallet/launch calls and strategy prompt properties remain unchanged. Known frontend launch messages are localized while unknown upstream diagnostics are preserved.
- Local credentials, runtime data and build outputs remain excluded from version control.
