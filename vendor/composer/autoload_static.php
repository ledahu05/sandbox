<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit1971249e62e1c58f9965587c779c09f7
{
    public static $files = array (
        '0e6d7bf4a5811bfa5cf40c5ccd6fae6a' => __DIR__ . '/..' . '/symfony/polyfill-mbstring/bootstrap.php',
        '667aeda72477189d0494fecd327c3641' => __DIR__ . '/..' . '/symfony/var-dumper/Resources/functions/dump.php',
        'e7223560d890eab89cda23685e711e2c' => __DIR__ . '/..' . '/psy/psysh/src/Psy/functions.php',
    );

    public static $prefixLengthsPsr4 = array (
        'X' => 
        array (
            'XdgBaseDir\\' => 11,
        ),
        'W' => 
        array (
            'Webmozart\\PathUtil\\' => 19,
            'Webmozart\\Assert\\' => 17,
        ),
        'S' => 
        array (
            'Symfony\\Polyfill\\Mbstring\\' => 26,
            'Symfony\\Component\\Yaml\\' => 23,
            'Symfony\\Component\\VarDumper\\' => 28,
            'Symfony\\Component\\Finder\\' => 25,
            'Symfony\\Component\\EventDispatcher\\' => 34,
            'Symfony\\Component\\Debug\\' => 24,
            'Symfony\\Component\\Console\\' => 26,
        ),
        'P' => 
        array (
            'Psy\\' => 4,
            'Psr\\Log\\' => 8,
            'PhpParser\\' => 10,
        ),
        'C' => 
        array (
            'Consolidation\\OutputFormatters\\' => 31,
            'Consolidation\\AnnotatedCommand\\' => 31,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'XdgBaseDir\\' => 
        array (
            0 => __DIR__ . '/..' . '/dnoegel/php-xdg-base-dir/src',
        ),
        'Webmozart\\PathUtil\\' => 
        array (
            0 => __DIR__ . '/..' . '/webmozart/path-util/src',
        ),
        'Webmozart\\Assert\\' => 
        array (
            0 => __DIR__ . '/..' . '/webmozart/assert/src',
        ),
        'Symfony\\Polyfill\\Mbstring\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/polyfill-mbstring',
        ),
        'Symfony\\Component\\Yaml\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/yaml',
        ),
        'Symfony\\Component\\VarDumper\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/var-dumper',
        ),
        'Symfony\\Component\\Finder\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/finder',
        ),
        'Symfony\\Component\\EventDispatcher\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/event-dispatcher',
        ),
        'Symfony\\Component\\Debug\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/debug',
        ),
        'Symfony\\Component\\Console\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/console',
        ),
        'Psy\\' => 
        array (
            0 => __DIR__ . '/..' . '/psy/psysh/src/Psy',
        ),
        'Psr\\Log\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/log/Psr/Log',
        ),
        'PhpParser\\' => 
        array (
            0 => __DIR__ . '/..' . '/nikic/php-parser/lib/PhpParser',
        ),
        'Consolidation\\OutputFormatters\\' => 
        array (
            0 => __DIR__ . '/..' . '/consolidation/output-formatters/src',
        ),
        'Consolidation\\AnnotatedCommand\\' => 
        array (
            0 => __DIR__ . '/..' . '/consolidation/annotated-command/src',
        ),
    );

    public static $prefixesPsr0 = array (
        'p' => 
        array (
            'phpDocumentor' => 
            array (
                0 => __DIR__ . '/..' . '/phpdocumentor/reflection-docblock/src',
            ),
        ),
        'J' => 
        array (
            'JakubOnderka\\PhpConsoleHighlighter' => 
            array (
                0 => __DIR__ . '/..' . '/jakub-onderka/php-console-highlighter/src',
            ),
            'JakubOnderka\\PhpConsoleColor' => 
            array (
                0 => __DIR__ . '/..' . '/jakub-onderka/php-console-color/src',
            ),
        ),
        'D' => 
        array (
            'Drush' => 
            array (
                0 => __DIR__ . '/..' . '/drush/drush/lib',
            ),
        ),
        'C' => 
        array (
            'Consolidation' => 
            array (
                0 => __DIR__ . '/..' . '/drush/drush/lib',
            ),
        ),
    );

    public static $classMap = array (
        'Console_Table' => __DIR__ . '/..' . '/pear/console_table/Table.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit1971249e62e1c58f9965587c779c09f7::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit1971249e62e1c58f9965587c779c09f7::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInit1971249e62e1c58f9965587c779c09f7::$prefixesPsr0;
            $loader->classMap = ComposerStaticInit1971249e62e1c58f9965587c779c09f7::$classMap;

        }, null, ClassLoader::class);
    }
}
