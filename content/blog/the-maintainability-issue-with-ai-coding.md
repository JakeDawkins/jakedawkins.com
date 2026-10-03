---
title: 'The maintainability issue with AI coding'
description: 'How to fight back against increasing complexity in the age of AI'
type: article
stage: seedling
planted: 2023-09-27
topics: [AI]
featured: false
---

Code complexity has always been a concern with real software projects. Over time, small exceptions, bug fixes, and experimentation turns once-simple code into a complex mess, often causing more subtle bugs, that can be a nuisance to users and developers alike. With human software teams, there's a natural limit to the complexity of a system before it becomes too complex to reason about. Eventually, this leads to a rewrite, because the cost of maintenance is higher than the cost of rewrite.

I think one of the largest issues with using AI coding assistants at scale over time, is that this problem doesn't go away, but the complexity threshold is much higher.

I've seen it too many times to count at this point; asking an AI agent to fix a bug or setup an experiment on a chunk of code is often sloppy. It cares much less about code duplication (since it doesn't have the context of everything else in the project), and it's happy to throw in any number of conditionals, readability be damned.

In the past, when humans pour their time into a change, that effort is paired with their existing knowledge of the codebase, existing patterns, and with a focus on understandability (since they're responsible for the end result). And while they're in there, they're also likely to catch old code that can be cleaned up as well.

By default, AI typically isn't.

So what do we do about that? How do we put the brakes on the ever-expanding complexity of these projects? And how do we start to fight back?

---

Unfinished thoughts:

1. AI code review, with focus on code cleanliness, deduplication, and dead code cleanup
2. Deterministic code complexity CI (https://fallow.tools/)
3. How to retroactively clean up old complexity? Plan for code reduction? Experimentation removing edges?
