<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitae4bbff38a19b6740a5a0db01159cb11
{
    public static $prefixLengthsPsr4 = array (
        'v' => 
        array (
            'voku\\' => 5,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'voku\\' => 
        array (
            0 => __DIR__ . '/..' . '/voku/portable-ascii/src/voku',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitae4bbff38a19b6740a5a0db01159cb11::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitae4bbff38a19b6740a5a0db01159cb11::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitae4bbff38a19b6740a5a0db01159cb11::$classMap;

        }, null, ClassLoader::class);
    }
}
