USE snapgame;

INSERT INTO users (
    id,
    username,
    email,
    password_hash,
    created_at,
    last_login
) VALUES (
    'testuser',
    'testuser',
    'testuser@example.com',
    '9c9c5c3cf718b0d70e6f9cabb53ccad5f4b7582c91f957859a8e3df5f70a5f6d',
    NOW(),
    NULL
);


INSERT INTO games (
    id,
    title,
    description,
    game_url,
    thumbnail_url,
    entry_url,
    created_by
) VALUES (
    'bottle-flip',
    'Bottle Flip',
    'Flip the bottle',
    '/games/bottle-flip/',
    '/games/bottle-flip/assets/intro-background.png',
    '/games/bottle-flip/templates/index.html',
    'testuser'                                       
);

INSERT INTO games (
    id,
    title,
    description,
    game_url,
    thumbnail_url,
    entry_url,
    created_by
) VALUES (
    'color-clash',
    'Color Clash',
    'Find the right color and text',
    '/games/color-clash/',
    '/games/color-clash/assets/intro-background.png',
    '/games/color-clash/templates/index.html',
    'testuser'                                       
);


INSERT INTO games (
    id,
    title,
    description,
    game_url,
    thumbnail_url,
    entry_url,
    created_by
) VALUES (
    'time-stop',
    'Time Stop',
    'Stop the timer at the target second',
    '/games/time-stop/',
    '/games/time-stop/assets/intro-background.png',
    '/games/time-stop/templates/index.html',
    'testuser'                                       
);
