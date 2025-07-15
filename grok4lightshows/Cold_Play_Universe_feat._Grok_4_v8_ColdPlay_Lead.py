import struct
import math

# Constants
CHANNEL_COUNT = 200  # Channels from 0 to 199
STEP_TIME_MS = 25  # 40 FPS
SONG_DURATION_S = 4 * 60 + 42  # 4:42
FRAME_COUNT = int(SONG_DURATION_S * 1000 / STEP_TIME_MS)  # 11280 frames

compression_type = 0
unique_id = 0

header_size = 32
channel_data_offset = header_size

header = struct.pack('<4sHHBBI IBB BBBBQ',
    b'PSEQ', channel_data_offset, 0, 2, header_size,
    CHANNEL_COUNT, FRAME_COUNT, STEP_TIME_MS, 0,
    compression_type, 0, 0, 0, unique_id
)

# Channel definitions
channels = {
    'leftOuterMainBeam': [0],
    'rightOuterMainBeam': [1],
    'leftInnerMainBeam': [2],
    'rightInnerMainBeam': [3],
    'leftFrontTurnSignal': [12],
    'rightFrontTurnSignal': [13],
    'leftRearTurn': [22],
    'rightRearTurn': [23],
    'centerBrake': [24],
    'leftTail': [25],
    'rightTail': [26],
    'rearLicensePlate': [29],
    'bedLights': [27],
    'leftFrontSideMarkers': [4],
    'rightFrontSideMarkers': [5],
    'leftRearSideMarker': [20],
    'rightRearSideMarker': [21],
    'frunkIntLight': [16],
    'frunk': [40],
    'chargePort': [45],
    'leftFrontWindow': [36],
    'leftRearWindow': [37],
    'rightFrontWindow': [38],
    'rightRearWindow': [39],
    'leftMirror': [34],
    'rightMirror': [35],
    'leftFrontLightBar': list(range(46, 75)),  # 29 segments
    'rightFrontLightBar': list(range(76, 105)),  # 29 segments
    'leftRearLightBar': list(range(110, 135)),  # 25 segments
    'rightRearLightBar': list(range(136, 161)),  # 25 segments
    'centerFrontDisplayRGB': list(range(175, 178)),
    'rightRearRGB': list(range(178, 181)),
    'rightFrontRGB': list(range(181, 184)),
    'centerFrontRGB': list(range(184, 187)),
    'leftFrontRGB': list(range(187, 190)),
    'leftRearRGB': list(range(190, 193)),
}

# Helper functions
def time_to_frame(time_s):
    return int(time_s * 1000 / STEP_TIME_MS)

def set_channel(data, frame, ch, val):
    offset = frame * CHANNEL_COUNT + ch
    data[offset] = val & 0xFF

def set_channels(data, frame, ch_list, val):
    for ch in ch_list:
        set_channel(data, frame, ch, val)

def set_rgb(data, frame, rgb_ch, r, g, b):
    set_channel(data, frame, rgb_ch[0], r)
    set_channel(data, frame, rgb_ch[1], g)
    set_channel(data, frame, rgb_ch[2], b)

def set_bar(data, frame, bar_ch, values):
    for i, ch in enumerate(bar_ch):
        set_channel(data, frame, ch, values[i])

# Animation functions for light bars
def knight_rider_animation(bar_ch, frame, cycle_length, brightness=255):
    bar_len = len(bar_ch)
    pos = frame % (2 * bar_len - 2)
    if pos >= bar_len:
        pos = 2 * bar_len - 2 - pos
    values = [0] * bar_len
    values[pos] = brightness
    # Trail effect
    if pos > 0:
        values[pos - 1] = brightness // 2
    if pos < bar_len - 1:
        values[pos + 1] = brightness // 2
    return values

def loading_bar_animation(bar_ch, frame, cycle_length, brightness=255):
    bar_len = len(bar_ch)
    progress = (frame % cycle_length) / cycle_length
    fill = int(bar_len * progress)
    values = [brightness if i < fill else 0 for i in range(bar_len)]
    return values

def barber_pole_animation(bar_ch, frame, stripe_width=3, speed=1, brightness=255):
    bar_len = len(bar_ch)
    values = [0] * bar_len
    for i in range(bar_len):
        if (i + frame * speed) % (stripe_width * 2) < stripe_width:
            values[i] = brightness
    return values

def collision_chase_animation(bar_ch, frame, cycle_length, brightness=255):
    bar_len = len(bar_ch)
    left_pos = (frame % cycle_length) * bar_len // cycle_length
    right_pos = bar_len - 1 - left_pos
    values = [0] * bar_len
    values[left_pos] = brightness
    values[right_pos] = brightness
    if left_pos == right_pos:
        values[left_pos] = 255  # Collision bright
    return values

def chase_animation(bar_ch, frame, speed=2, brightness=255):
    bar_len = len(bar_ch)
    pos = (frame * speed) % bar_len
    values = [brightness if i == pos else 0 for i in range(bar_len)]
    return values

def bounce_animation(bar_ch, frame, cycle_length, brightness=255):
    bar_len = len(bar_ch)
    pos = frame % (2 * bar_len - 2)
    if pos >= bar_len:
        pos = 2 * bar_len - 2 - pos
    values = [0] * bar_len
    values[pos] = brightness
    if pos > 0:
        values[pos - 1] = brightness // 3
    if pos > 1:
        values[pos - 2] = brightness // 6
    if pos < bar_len - 1:
        values[pos + 1] = brightness // 3
    if pos < bar_len - 2:
        values[pos + 2] = brightness // 6
    return values

# Function to ramp brightness over time
def ramp_brightness(start_frame, end_frame, ch_list, max_bright=255):
    ramp_frames = end_frame - start_frame
    for f in range(start_frame, end_frame):
        bright = int(max_bright * (f - start_frame) / ramp_frames)
        set_channels(data, f, ch_list, bright)

# Function to pulse brightness
def pulse_brightness(start_frame, end_frame, ch_list, freq=1, max_bright=255):
    for f in range(start_frame, end_frame):
        time_s = f * STEP_TIME_MS / 1000
        bright = int(max_bright * (0.5 + 0.5 * math.sin(2 * math.pi * freq * time_s)))
        set_channels(data, f, ch_list, bright)

# Function to flash alternating
def alternate_flash(start_frame, end_frame, left_ch, right_ch, period_frames=20):
    for f in range(start_frame, end_frame):
        if (f // period_frames) % 2 == 0:
            set_channels(data, f, left_ch, 255)
            set_channels(data, f, right_ch, 0)
        else:
            set_channels(data, f, left_ch, 0)
            set_channels(data, f, right_ch, 255)

# RGB color cycle
def rgb_cycle(start_frame, end_frame, rgb_ch, speed=0.1):
    for f in range(start_frame, end_frame):
        time_s = f * STEP_TIME_MS / 1000
        r = int(127 + 127 * math.sin(2 * math.pi * speed * time_s))
        g = int(127 + 127 * math.sin(2 * math.pi * speed * time_s + 2*math.pi/3))
        b = int(127 + 127 * math.sin(2 * math.pi * speed * time_s + 4*math.pi/3))
        set_rgb(data, f, rgb_ch, r, g, b)

# Initialize data
data = bytearray(FRAME_COUNT * CHANNEL_COUNT)

# Song sections (scaled approximately to 4:42, factor ~282/5.00)
intro_start = time_to_frame(0)
intro_end = time_to_frame(0.19 * 282 / 5.00)
verse1_start = intro_end
verse1_end = time_to_frame(0.56 * 282 / 5.00)
prechorus1_start = verse1_end
prechorus1_end = time_to_frame(1.15 * 282 / 5.00)
chorus1_start = prechorus1_end
chorus1_end = time_to_frame(1.52 * 282 / 5.00)
verse2_start = chorus1_end
verse2_end = time_to_frame(2.30 * 282 / 5.00)
chorus2_start = verse2_end
chorus2_end = time_to_frame(3.07 * 282 / 5.00)
postchorus_start = chorus2_end
postchorus_end = time_to_frame(3.26 * 282 / 5.00)
bridge_start = postchorus_end
bridge_end = time_to_frame(4.22 * 282 / 5.00)
prechorus2_start = bridge_end
prechorus2_end = time_to_frame(4.41 * 282 / 5.00)
chorus3_start = prechorus2_end
chorus3_end = FRAME_COUNT if time_to_frame(5.00 * 282 / 5.00) > FRAME_COUNT else time_to_frame(5.00 * 282 / 5.00)
outro_start = chorus3_end
outro_end = FRAME_COUNT

# Beginning ramp (0 to 20s)
ramp_start = time_to_frame(0)
ramp_end = time_to_frame(20)

# Ramp all main lights softly
main_lights = channels['leftOuterMainBeam'] + channels['rightOuterMainBeam'] + channels['leftInnerMainBeam'] + channels['rightInnerMainBeam']
side_markers = channels['leftFrontSideMarkers'] + channels['rightFrontSideMarkers'] + channels['leftRearSideMarker'] + channels['rightRearSideMarker']
tail_lights = channels['leftTail'] + channels['rightTail'] + channels['centerBrake'] + channels['rearLicensePlate'] + channels['bedLights']

ramp_brightness(ramp_start, ramp_end, main_lights)
ramp_brightness(ramp_start, ramp_end, side_markers)
ramp_brightness(ramp_start, ramp_end, tail_lights)

# Frunk commands (6 commands: open, dance, close, open, dance, close)
frunk_ch = channels['frunk'][0]
# Command 1: open at 30s
set_channel(data, time_to_frame(30), frunk_ch, 64)
# Command 2: dance 60-80s
for f in range(time_to_frame(60), time_to_frame(80)):
    set_channel(data, f, frunk_ch, 128)
# Command 3: close at 90s
set_channel(data, time_to_frame(90), frunk_ch, 191)
# Command 4: open at 120s
set_channel(data, time_to_frame(120), frunk_ch, 64)
# Command 5: dance 150-170s
for f in range(time_to_frame(150), time_to_frame(170)):
    set_channel(data, f, frunk_ch, 128)
# Command 6: close at 180s
set_channel(data, time_to_frame(180), frunk_ch, 191)

# Charge port commands (3 commands within 2min window, first open)
charge_ch = channels['chargePort'][0]
first_charge_time = 100  # s
# Command 1: open at 100s
set_channel(data, time_to_frame(first_charge_time), charge_ch, 64)
# Command 2: dance 110-130s
for f in range(time_to_frame(110), time_to_frame(130)):
    set_channel(data, f, charge_ch, 128)
# Command 3: close at 140s (within 100+120=220s)
set_channel(data, time_to_frame(140), charge_ch, 191)

# Windows (start open, use open and dance, 6 commands each, independent and synced)
# Synced dances and independent opens/dances
lfw_ch = channels['leftFrontWindow'][0]
lrw_ch = channels['leftRearWindow'][0]
rfw_ch = channels['rightFrontWindow'][0]
rrw_ch = channels['rightRearWindow'][0]

# Synced dance for all at 40-50s (1 command per)
for f in range(time_to_frame(40), time_to_frame(50)):
    set_channel(data, f, lfw_ch, 128)
    set_channel(data, f, lrw_ch, 128)
    set_channel(data, f, rfw_ch, 128)
    set_channel(data, f, rrw_ch, 128)

# Independent: left front open at 55s, dance 60-65s
set_channel(data, time_to_frame(55), lfw_ch, 64)
for f in range(time_to_frame(60), time_to_frame(65)):
    set_channel(data, f, lfw_ch, 128)

# Left rear open at 70s, dance 75-80s
set_channel(data, time_to_frame(70), lrw_ch, 64)
for f in range(time_to_frame(75), time_to_frame(80)):
    set_channel(data, f, lrw_ch, 128)

# Right front open at 85s, dance 90-95s
set_channel(data, time_to_frame(85), rfw_ch, 64)
for f in range(time_to_frame(90), time_to_frame(95)):
    set_channel(data, f, rfw_ch, 128)

# Right rear open at 100s, dance 105-110s
set_channel(data, time_to_frame(100), rrw_ch, 64)
for f in range(time_to_frame(105), time_to_frame(110)):
    set_channel(data, f, rrw_ch, 128)

# Another synced dance 200-210s
for f in range(time_to_frame(200), time_to_frame(210)):
    set_channel(data, f, lfw_ch, 128)
    set_channel(data, f, lrw_ch, 128)
    set_channel(data, f, rfw_ch, 128)
    set_channel(data, f, rrw_ch, 128)

# Independent opens to fill to 6: e.g. each open once more
set_channel(data, time_to_frame(220), lfw_ch, 64)
set_channel(data, time_to_frame(225), lrw_ch, 64)
set_channel(data, time_to_frame(230), rfw_ch, 64)
set_channel(data, time_to_frame(235), rrw_ch, 64)

# Mirrors (start open, open and close, 6 commands each, independent and synced)
lm_ch = channels['leftMirror'][0]
rm_ch = channels['rightMirror'][0]

# Synced: both close at 25s, open at 35s
set_channel(data, time_to_frame(25), lm_ch, 191)
set_channel(data, time_to_frame(25), rm_ch, 191)
set_channel(data, time_to_frame(35), lm_ch, 64)
set_channel(data, time_to_frame(35), rm_ch, 64)

# Independent: left close 50s, open 55s; right close 60s, open 65s
set_channel(data, time_to_frame(50), lm_ch, 191)
set_channel(data, time_to_frame(55), lm_ch, 64)
set_channel(data, time_to_frame(60), rm_ch, 191)
set_channel(data, time_to_frame(65), rm_ch, 64)

# Synced close 150s, open 160s
set_channel(data, time_to_frame(150), lm_ch, 191)
set_channel(data, time_to_frame(150), rm_ch, 191)
set_channel(data, time_to_frame(160), lm_ch, 64)
set_channel(data, time_to_frame(160), rm_ch, 64)

# Independent to fill: left close 170s, open 175s; right close 180s, open 185s
set_channel(data, time_to_frame(170), lm_ch, 191)
set_channel(data, time_to_frame(175), lm_ch, 64)
set_channel(data, time_to_frame(180), rm_ch, 191)
set_channel(data, time_to_frame(185), rm_ch, 64)

# Lights: synced, alternating, unsynced
# Turn signals flash alternating in verse2 (BTS)
left_turns = channels['leftFrontTurnSignal'] + channels['leftRearTurn']
right_turns = channels['rightFrontTurnSignal'] + channels['rightRearTurn']

# Synced flash in chorus1 (Coldplay)
for f in range(chorus1_start, chorus1_end):
    bright = 255 if (f % 20 < 10) else 0
    set_channels(data, f, left_turns + right_turns, bright)

# Alternating flash in verse2 (BTS)
alternate_flash(verse2_start, verse2_end, left_turns, right_turns, 10)

# Synced flash in chorus2
for f in range(chorus2_start, chorus2_end):
    bright = 255 if (f % 20 < 10) else 0
    set_channels(data, f, left_turns + right_turns, bright)

# Unsynced: random for bed lights in bridge
for f in range(bridge_start, bridge_end):
    bright = int(255 * math.sin(f * 0.1 + 1)) if f % 3 == 0 else 0  # Pseudo random
    set_channels(data, f, channels['bedLights'], bright)

# Light bars animations
lf_bar = channels['leftFrontLightBar']
rf_bar = channels['rightFrontLightBar']
lr_bar = channels['leftRearLightBar']
rr_bar = channels['rightRearLightBar']

# Intro: soft pulse
pulse_brightness(intro_start, intro_end, lf_bar + rf_bar + lr_bar + rr_bar, freq=0.2, max_bright=255)

# Verse1 (Coldplay): loading bar on front, slow pulse on rear
for f in range(verse1_start, verse1_end):
    values = loading_bar_animation(lf_bar, f - verse1_start, 60)
    set_bar(data, f, lf_bar, values)
    values = loading_bar_animation(rf_bar, f - verse1_start, 60)
    set_bar(data, f, rf_bar, values)
pulse_brightness(verse1_start, verse1_end, lr_bar + rr_bar, freq=0.3, max_bright=200)

# Prechorus1 (Coldplay): barber pole on all, synced
for f in range(prechorus1_start, prechorus1_end):
    values = barber_pole_animation(lf_bar, f - prechorus1_start, stripe_width=4, speed=1)
    set_bar(data, f, lf_bar, values)
    values = barber_pole_animation(rf_bar, f - prechorus1_start, stripe_width=4, speed=1)
    set_bar(data, f, rf_bar, values)
    values = barber_pole_animation(lr_bar, f - prechorus1_start, stripe_width=4, speed=1)
    set_bar(data, f, lr_bar, values)
    values = barber_pole_animation(rr_bar, f - prechorus1_start, stripe_width=4, speed=1)
    set_bar(data, f, rr_bar, values)

# Chorus1 (Coldplay): bounce on front, loading on rear
for f in range(chorus1_start, chorus1_end):
    values = bounce_animation(lf_bar, f - chorus1_start, 50)
    set_bar(data, f, lf_bar, values)
    values = bounce_animation(rf_bar, f - chorus1_start, 50)
    set_bar(data, f, rf_bar, values)
    values = loading_bar_animation(lr_bar, f - chorus1_start, 40)
    set_bar(data, f, lr_bar, values)
    values = loading_bar_animation(rr_bar, f - chorus1_start, 40)
    set_bar(data, f, rr_bar, values)

# Verse2 (BTS): knight rider on all, fast
for f in range(verse2_start, verse2_end):
    values = knight_rider_animation(lf_bar, f - verse2_start, 40)
    set_bar(data, f, lf_bar, values)
    values = knight_rider_animation(rf_bar, f - verse2_start, 40)
    set_bar(data, f, rf_bar, values)
    values = knight_rider_animation(lr_bar, f - verse2_start, 40)
    set_bar(data, f, lr_bar, values)
    values = knight_rider_animation(rr_bar, f - verse2_start, 40)
    set_bar(data, f, rr_bar, values)

# Chorus2 (mixed): chase on front, collision on rear
for f in range(chorus2_start, chorus2_end):
    values = chase_animation(lf_bar, f - chorus2_start, speed=3)
    set_bar(data, f, lf_bar, values)
    values = chase_animation(rf_bar, f - chorus2_start, speed=3)
    set_bar(data, f, rf_bar, values)
    values = collision_chase_animation(lr_bar, f - chorus2_start, 50)
    set_bar(data, f, lr_bar, values)
    values = collision_chase_animation(rr_bar, f - chorus2_start, 50)
    set_bar(data, f, rr_bar, values)

# Postchorus (BTS): alternate barber pole direction
for f in range(postchorus_start, postchorus_end):
    values = barber_pole_animation(lf_bar, f - postchorus_start, speed=2)
    set_bar(data, f, lf_bar, values)
    values = barber_pole_animation(rf_bar, f - postchorus_start, speed=-2)
    set_bar(data, f, rf_bar, values)
    values = barber_pole_animation(lr_bar, f - postchorus_start, speed=2)
    set_bar(data, f, lr_bar, values)
    values = barber_pole_animation(rr_bar, f - postchorus_start, speed=-2)
    set_bar(data, f, rr_bar, values)

# Bridge (BTS): wild mix, bounce and chase
for f in range(bridge_start, bridge_end):
    if (f - bridge_start) % 80 < 20:
        values = bounce_animation(lf_bar, f - bridge_start, 30)
        set_bar(data, f, lf_bar, values)
    elif (f - bridge_start) % 80 < 40:
        values = chase_animation(rf_bar, f - bridge_start, speed=4)
        set_bar(data, f, rf_bar, values)
    elif (f - bridge_start) % 80 < 60:
        values = knight_rider_animation(lr_bar, f - bridge_start, 30)
        set_bar(data, f, lr_bar, values)
    else:
        values = collision_chase_animation(rr_bar, f - bridge_start, 30)
        set_bar(data, f, rr_bar, values)

# Prechorus2 (mixed): loading on all
for f in range(prechorus2_start, prechorus2_end):
    values = loading_bar_animation(lf_bar, f - prechorus2_start, 50)
    set_bar(data, f, lf_bar, values)
    values = loading_bar_animation(rf_bar, f - prechorus2_start, 50)
    set_bar(data, f, rf_bar, values)
    values = loading_bar_animation(lr_bar, f - prechorus2_start, 50)
    set_bar(data, f, lr_bar, values)
    values = loading_bar_animation(rr_bar, f - prechorus2_start, 50)
    set_bar(data, f, rr_bar, values)

# Chorus3 (Coldplay): barber pole slow on all
for f in range(chorus3_start, chorus3_end):
    values = barber_pole_animation(lf_bar, f - chorus3_start, speed=0.5)
    set_bar(data, f, lf_bar, values)
    values = barber_pole_animation(rf_bar, f - chorus3_start, speed=0.5)
    set_bar(data, f, rf_bar, values)
    values = barber_pole_animation(lr_bar, f - chorus3_start, speed=0.5)
    set_bar(data, f, lr_bar, values)
    values = barber_pole_animation(rr_bar, f - chorus3_start, speed=0.5)
    set_bar(data, f, rr_bar, values)

# Outro: fade out
fade_start = time_to_frame(260)
fade_end = FRAME_COUNT
fade_frames = fade_end - fade_start
all_bars = lf_bar + rf_bar + lr_bar + rr_bar
for f in range(fade_start, fade_end):
    bright = int(255 * (1 - (f - fade_start) / fade_frames))
    set_channels(data, f, all_bars, bright)

# RGB lights: different cycles for sections
rgb_list = [
    channels['centerFrontDisplayRGB'],
    channels['rightRearRGB'],
    channels['rightFrontRGB'],
    channels['centerFrontRGB'],
    channels['leftFrontRGB'],
    channels['leftRearRGB']
]

# Slow cycle for Coldplay sections
coldplay_sections = [(verse1_start, verse1_end), (prechorus1_start, prechorus1_end), (chorus1_start, chorus1_end), (prechorus2_start, prechorus2_end), (chorus3_start, chorus3_end)]
for start, end in coldplay_sections:
    for i, rgb_ch in enumerate(rgb_list):
        rgb_cycle(start, end, rgb_ch, speed=0.05)

# Fast cycle for BTS sections
bts_sections = [(verse2_start, verse2_end), (postchorus_start, postchorus_end), (bridge_start, bridge_end)]
for start, end in bts_sections:
    for i, rgb_ch in enumerate(rgb_list):
        rgb_cycle(start, end, rgb_ch, speed=0.2)

# Mixed for others
mixed_sections = [(intro_start, intro_end), (chorus2_start, chorus2_end), (outro_start, outro_end)]
for start, end in mixed_sections:
    for i, rgb_ch in enumerate(rgb_list):
        rgb_cycle(start, end, rgb_ch, speed=0.1 + i*0.01)

# Additional lights: pulse tails and main in Coldplay sections
for start, end in coldplay_sections:
    pulse_brightness(start, end, tail_lights + main_lights, freq=0.4, max_bright=255)

# Alternate side markers in BTS sections
left_side = channels['leftFrontSideMarkers'] + channels['leftRearSideMarker']
right_side = channels['rightFrontSideMarkers'] + channels['rightRearSideMarker']
for start, end in bts_sections:
    alternate_flash(start, end, left_side, right_side, 15)

# Synced brake in choruses
for f in range(chorus1_start, chorus1_end):
    set_channels(data, f, channels['centerBrake'], 255)
for f in range(chorus2_start, chorus2_end):
    set_channels(data, f, channels['centerBrake'], 255)
for f in range(chorus3_start, chorus3_end):
    set_channels(data, f, channels['centerBrake'], 255)

# Unsynced side markers in bridge already alternate

# Frunk interior light on when open/dance
for f in range(time_to_frame(30), time_to_frame(90)):
    set_channels(data, f, channels['frunkIntLight'], 255)
for f in range(time_to_frame(120), time_to_frame(180)):
    set_channels(data, f, channels['frunkIntLight'], 255)

# Write the fseq file
def write_fseq(filename, data, channel_count, frame_count, step_time):
    with open(filename, 'wb') as f:
        f.write(header)
        f.write(data)

write_fseq('Cold_Play_Universe_feat._Grok_4_v8_ColdPlay_Lead.fseq', data, CHANNEL_COUNT, FRAME_COUNT, STEP_TIME_MS)

print(f"Generated spiced remixed lightshow.fseq with {FRAME_COUNT} frames for {CHANNEL_COUNT} channels.")
