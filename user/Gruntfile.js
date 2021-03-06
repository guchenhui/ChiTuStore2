module.exports = function (grunt) {

    var src_user_root = '.';
    var dest_user_root = '../build/user';

    var ts_options = {
        module: 'amd',
        target: 'es6',
        removeComments: true,
        sourceMap: false,
    };

    grunt.initConfig({
        shell: {
            ts_user: {
                command: 'tsc -p .',
                options: {
                    failOnError: false
                }
            },
        },
        babel: {
            dist: {
                options: {
                    sourceMap: false,
                    //presets: ["es2015"],
                    plugins: ["transform-vue-jsx"]
                },
                files: [
                    { expand: true, cwd: 'build/modules', src: ['**/*.jsx'], dest: dest_user_root + '/modules', ext: '.js' }
                ]
            },
            es5: {
                options: {
                    sourceMap: false,
                    presets: ["es2015"],
                    plugins: ["transform-vue-jsx"]
                },
                files: [
                    { expand: true, cwd: 'build/modules', src: ['core/chitu.mobile.js'], dest: dest_user_root + '/modules.es5' },
                    { expand: true, cwd: 'build/modules', src: ['**/*.js', '**/*.jsx'], dest: dest_user_root + '/modules.es5', ext: '.js' },
                ]
            }
        },
        copy: {
            src_user: {
                files: [
                    {
                        expand: true, cwd: src_user_root, dest: dest_user_root,
                        src: ['js/**/*.js', 'content/**/*.css', 'content/font/*.*', 'images/*.*', 'ui/**/*.*', 'index.html'],
                    },
                    { expand: true, cwd: src_user_root + '/modules', dest: dest_user_root + '/pages', src: ['**/*.html'] },
                    { expand: true, cwd: 'build', dest: dest_user_root, src: ['**/*.js'] },
                ],
            }
        },
        less: {
            user: {
                files: [{
                    expand: true,
                    cwd: `modules`,
                    src: ['**/*.less'],
                    dest: `${dest_user_root}/content/app`,
                    ext: '.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['shell', 'less', 'babel', 'copy']);
}