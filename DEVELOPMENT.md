# Project Working Agreement

- The user's repository is `https://github.com/NemoMast/nofx`. Use `origin` for this personal fork and `upstream` for `https://github.com/NoFxAiOS/nofx`.
- After each requested source change is implemented and verified, create a descriptive commit and push it to the user's repository. The user has authorized this version-recording workflow. Do not push to upstream.
- Preserve unrelated user changes. Never force-push or overwrite remote work; reconcile new remote commits before publishing.
- Keep `.env`, API credentials, wallet/private keys, local preview credentials, databases, logs, dependency directories, and build outputs out of commits. `.project-guide/` contains local analysis and deployment details and is not part of the published application changes.
- Maintain Simplified Chinese and English UI coverage. Use existing React language state and translation patterns; preserve the selected language across refreshes.
- UI localization must not change model prompts, API enums, trade sizing, leverage, fees, wallet signatures, or execution rules. Keep user-authored content and external model output intact.
- Validate relevant tests and the frontend build, and inspect affected UI flows before publishing interface changes. Report remaining external-service limitations accurately.
- Do not start real trading, fund wallets, or connect a user's exchange account without a separate explicit request.
