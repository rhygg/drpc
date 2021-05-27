# DRPC 
**Drpc** is a robust discord rich precence client on the command line, you can save a preset, delete it and configure it, easily!

## Installation
```
npm install -g drpc-cli

```
## Documentation

To configure a preset you must create a `drpc-settings.json` file, in the current working directory i.e., the directory you are currently working on it. 
For example: if you create a `drpc-settings.json` file on the Desktop, the cli must run in the desktop folder.

Here's a example settings file,

```json
{
    "client_id":"",
    "large_image_key":"",
    "large_image_text":"",
    "small_image_key":"",
    "small_image_text":"",
    "description":"",
    "state":"",
    "show_timestamp": ,
    "buttons":[
        {"label":"", "url":""},
        {"label":"", "url":""}
    ]
}
```
The following is a full template, fill all the information correctly to yield the result!

## API

**client_id**

The client id of the rpc application.

required: `true`

**large_image_key**

The key(name) of the large image as set in the rpc application.

required: `true`

**large_image_text**
The text that would show off when a user hovers over the image.
required: `false`

**small_image_key**

The key(name) of the small image as set in the rpc application.

required: `false`

**small_image_text**

The text that would show off when a user hovers over the image.

required: `false`

**description**

The rpc description.

required: `true`

**state**

The rpc state description.

required: `false`

**show_timestamp**

(Bool) if you want to show the timestamp.

required: `false`

**buttons**

(Array) Buttons on the Rich Presence.

Array takes: two `objects`

Example Object:
```json
{"label":"Something", "url":"https://something.com"},
{"label":"anothersomething","url":"https://example.com"}
```
Min buttons: `1`,
Max buttons: `2`,
required: `false`


## CLI

```
    DRPC CLI
----------------------------------------------------
MAIN COMMANDS
-------------
--help | -h  --- Shows you the following menu

--run  --- Starts a process.

--delete | -del --- delete a configuration. (required args -> <name>)

--list | -l --- Check the list of saved presets.

SUB-COMMANDS 
------------
RUN
------
--save    --- Run a configuration while simultaneously saving it. (required args -> <name>)
--preset  --- Run a preset instead of a configuration file in the current working dir.

```

## FAQs

**How to save a rpc preset?**

```
drpc --run --save <name>

```
**Must the rpc config file be in the cwd while saving the preset?**
Yes.

If you're going to save the preset you want to run using:
```
drpc --run --save <name>

```
The configuration you want to run and save must be in the same current working directory.



