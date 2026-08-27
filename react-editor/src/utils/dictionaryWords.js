/**
 * High-Capacity Comprehensive English Vocabulary Dataset
 * Packed space-separated dictionary loaded into a Set at runtime for O(1) instant lookup.
 */

const TOP_CORE_WORDS = `
a about above across after again against all almost alone along already also although always am among an and another any anybody anyone anything anyway anywhere are around as at back be became because become becomes becoming been before began begin beginning begins behavior behind being believe below beside besides best better between beyond both but by call called came can cannot could day days did do does doing done down during each early either else end even ever every everybody everyone everything everywhere feel few find first for four from get gets getting give given gives go goes going gone good got great had has have having he her here hers herself him himself his how however i if in into is it its itself just keep kept know known knows large last later least less let like likely little long look looked looking looks made make makes making many may me men might more most mother move much must my myself name near never new next no none nor not nothing now of off often old on once one ones only open or order other others our ours ourselves out over own part people per place possible put rather read real really right said same saw say saying says see seeing seen set several shall she should show showed showing shows side simply since small so some somebody someone something sometimes somewhere state still such take taken takes taking tell than thank that the their theirs them themselves then there therefore these they thing things think thinks this those though thought three through throughout time times to together too took toward towards turn turned turning two under until up upon us use used uses using usually very want wanted wanting wants was way ways we well went were what whatever when whenever where whereas whether which while who whoever whole whom whose why will with within without won word words work worked working works world would write writer writing written wrong year years yes yet you young your yours yourself yourselves optimize optimization accessible accessibility receive received receiving performance document documents features feature integration integrations polish status assigned isolation toggle toggles toggled toggling click clicks clicked clicking spell spells spelled spelling checker
`;

const DICT_CHUNK_1 = `
abandon abandoned ability able abnormal aboard about above abroad absolute absolutely
absorb absorbed abstract abundant abuse academic accelerate acceleration accept acceptable
acceptance access accessible accident accidental accommodate accommodation accompany accomplish
accord accordance according account accountability accountable accurate accurately accuse
achieve achievement acid acknowledge acknowledgement acquire acquisition across act action
activate activation active actively activist activity actor actress actual actually adapt
adaptation adapter add addition additional address adequate adjust adjustment administer
administration administrative administrator admirable admire admission admit adopt adoption
adult advance advanced advantage adventure advertise advertisement advertising advice advise
advisor advisory advocate affair affect affection afford affordable afraid after afternoon
afterwards again against age agency agenda agent aggression aggressive agree agreeable
agreement agriculture ahead aid aim air airborne aircraft airline airplane airport aisle
alarm album alcohol alert alien align alignment alike alive all allege alleged allegely
alliance allocate allocation allow allowable allowance ally almost alone along alongside
already also alter alteration alternative although altogether always amateur amaze amazing
ambassador ambition ambitious ambulance amend amendment amidst among amongst amount
analysis analyst analytic analyze anchor ancient angel anger angle angry animal announce
announcement annual annually anonymous another answer anticipate anticipation anxiety anxious
any anybody anyhow anymore anyone anything anyway anywhere apart apartment apology app
apparent apparently appeal appear appearance append appendix appetite applause apple
applicable applicant application apply appoint appointment appreciate appreciation approach
appropriate approval approve approximate approximately arbitrary arch architect architectural
architecture archive arctic area arena argue argument arise arm armed armor army around
arrange arrangement array arrest arrival arrive arrow art article articulate artifact
artificial artist artistic as ascend ash asia asian aside ask asleep aspect aspire
assault assemble assembly assert assertion assess assessment asset assign assignment
assist assistance assistant associate associated association assume assumption assure
astonish astound athlete athletic atmosphere attach attached attachment attack attacker
attain attempt attend attendance attention attitude attorney attract attraction attractive
attribute audio audit audition auditorium augment august authentic author authority
authorization authorize auto automate automatic automation autonomous autonomy autumn
avail available availability avenue average avoid await awake award aware awareness away
awesome awful awkward
`;

const DICT_CHUNK_2 = `
baby bachelor back background backup backward badge bag baggage bail bake balance
balanced balcony bald ball ballet balloon ballot bamboo ban banana band bandage
bandwidth bang bank banker banking banner banquet bar barbecue bare barely bargain
barrel barrier base baseline basement basic basically basis basket basketball bass
bat batch bath bathroom battery battle bay beach beacon beam bean bear beast beat
beautiful beauty because become becoming bed bedroom bee beef beer before beforehand
beg begin beginner beginning behave behavior behavioral behind being belief believe
bell belong beloved below belt bench benchmark bend beneath beneficial benefit beside
besides best bet better between beverage beyond bias bicycle bid big bike bilateral
bill billion bind binary bind bio biochemistry biography biological biology bird birth
birthday bishop bit bite bitter bizarre black blade blame blank blanket blast bleed
blend bless blind blink block blocked blocking blood bloody bloom blow blue blueprint
blur board boat body bold bolt bomb bond bone bonus book boom boost boot border bore
borrow boss both bother bottle bottom bounce bound boundary bounty bout bow bowl box
boy boyfriend brace bracket brag brain brake branch brand brave bread break breaker
breakfast breakthrough breast breath breathe breed breeze brick bride bridge brief
briefly bright brilliant bring broad broadband broadcast brochure broke broken broker
bronze brother brow brown browse browser brush brutal bubble buck bucket buddy budget
bug build builder building bulb bulk bull bullet bulletin bully bunch bundle burden
bureau bureaucracy burial burn burst bury bus bush business businessman busy but
butter butterfly button buy buyer buying buzz byte by
`;

const DICT_CHUNK_3 = `
cab cabin cabinet cable cafe cage cake calculate calculation calculator calendar
caliber call calm calorie camera camp campaign campus can canal cancel cancer candidate
candle candy cane canvas canyon cap capability capable capacity cape capital capitalism
capsule captain caption capture captured car carbon card care career careful carefully
careless cargo caring carpet carriage carrier carry cart carton case cash cashier casino
cast castle casual casualty cat catalog catalogue catch categorize category cathedral
catholic cattle cause caution cautious cave cease ceiling celebrate celebration celebrity
cell cellular cement cemetery censor census central centralize center ceremony certain
certainly certainty certificate chain chair chairman challenge chamber champion
championship chance change chaos chapter character characteristic characterize charcoal
charge charity charm charming chart charter chase chat cheap cheat check checklist
cheek cheer cheerful cheese chef chemical chemistry cheque cherry chess chest chew
chicken chief child childhood chill chin china chip chocolate choice choir choke
cholesterol choose chore chronic chunk church cinema circle circuit circular circulate
circulation circumstance cite citizen citizenship city civil civilian civilization
claim clarity clash class classic classical classification classify classmate classroom
clause clay clean clear clearance clearly clerk clever click client cliff climate
climax climb clinic clinical clip clock close closed closely closer closet closure
cloth clothe clothes clothing cloud cloudy club clue clump cluster clutch coach coal
coalition coast coastal coat code coffee cognitive coil coin coincide cold collapse
collar colleague collect collection collective collector college colonial colony
color colorful column columnist combat combination combine come comedy comfort
comfortable comic comma command commander commence commend comment commentary
commercial commission commit commitment committed committee commodity common commonly
communicate communication community commute compact company compare comparison
compartment compel compensate compensation compete competent competition competitive
competitor compile complain complaint complement complete completely completion
complex complexity compliance complicate complicated component compose composer
composition compound comprehensive compress compromise compute computer computing
comrade concave conceal concede conceit conceive concentrate concentration concept
concern concerned concerning concert concession conclude conclusion concrete concurrent
condemn condition conditional conduct conductor conference confess confession confidence
confident confidential configure confine confirm conflict conform confront confuse
confusion congress connect connection connective conquer conscience conscious consciousness
consecutive consensus consent consequence consequent conservative consider considerable
consideration consist consistency consistent console consolidate consortium constant
constantly constitute constitution construct construction consultant consult consume
consumer consumption contact contain container contemporary content contest context
continent continual continue continuous contract contractor contradiction contrary
contrast contribute contribution contributor control controller controversy controversial
convenience convenient convention conventional conversation convert conversion convey
convict conviction convince cook cookie cool cooperate cooperation cooperative coordinate
coordinator cop cope copper copy core cork corn corner corporate corporation correct
correction correctly correlation correspond corridor corrupt cost costly costume cottage
cotton couch cough could council counsel count countdown counter counterpart countless
country countryside county couple courage course court courtesy cousin cover coverage
covert cow cowboy crack cradle craft crawl crazy cream create creation creative
creativity creator creature credential credit creditable creek creep crew cricket crime
criminal crisis criterion critic critical criticism criticize critique crop cross crowd
crown crucial crude cruel cruise crush crust cry crystal cube cubic cultivate culture
cup cure curious currency current currently curriculum curry curtain curve cushion
custom customary customer cut cute cycle cylinder
`;

const DICT_CHUNK_4 = `
dad daily dairy daisy damage damn damp dance dancer dancing danger dangerous dare
dark darkroom darling dash data database date daughter dawn day daytime dead deadly
deal dealer dear death debate debt decade decay deceive decent decide decision decisive
deck declaration declare decline decode decorate decor decoration deep deeply deer
defeat defect defend defendant defense defensive defer deficiency define definitely
definition degree delay delegate delegation delete deliberate delicate delicious
delight delightful deliver delivery demand democracy democrat democratic demolish
demonstrate demonstration denial density dental deny depart department departure depend
dependable dependent dependence deploy deposit depress depression depth deputy derive
descend descendant describe description desert deserve design designer desirable desire
desk despair desperate destination destroy destruction detach detail detailed detect
detective detector determine determination determined develop developer development
device devil devote devoted diagram dial dialect dialogue diameter diamond diary
dictate dictator dictionary die diet differ difference different difficult difficulty
dig digital dignity dilemma dimension diminish dine dinner dip diploma diplomacy
diplomat diplomatic direct direction directly director directory dirt dirty disable
disagree disagreement disappear disappoint disappointment disaster disastrous discharge
disciple discipline disclose discount discourage discover discovery discreet discrete
discretion discriminate discrimination discuss discussion disease disgust dish disk
dismiss disorder dispatch display dispute disrupt dissatisfaction dissolve distance
distant distinct distinction distinguish distract distribute distribution district
disturb disturbance ditch dive diverge diverse diversity divide division divorce dock
doctor doctrine document documentary dog dollar domain domestic dominant dominate
donate donation donor door dosage dose double doubt down download draft drag drain
drama dramatic drastically draw drawer drawing dread dream dress drift drill drink
drive driver drop drought drown drug drum drunk dry dual duck due dull dump duplicate
duration dusk dust duty dwell dwelling dye dying dynamic
`;

const DICT_CHUNK_5 = `
each eager eagle ear early earn earnings earth earthquake ease easily east eastern
easy eat eccentric echo ecological ecology economic economical economics economist
economy edge edition editor editorial educate educated education educational educator
effect effective effectively efficiency efficient effort egg ego eight eighteen
eighty either eject elaborate elect election electoral electric electrical electricity
electron electronic electronics elegant element elementary elephant elevate elevation
elevator eligible eliminate elite elsewhere embark embarrass embrace emerge emergence
emergency emission emit emotion emotional emphasis emphasize empire employ employee
employer employment empower empty enable enact enclose encounter encourage encouraging
end endanger endless endorse endue endurance endure enemy energetic energy enforce
enforcement engage engagement engine engineer engineering english enhance enjoy
enormous enough enquiry enrich ensure enter enterprise entertain entertainment
enthusiasm enthusiastic entire entirely entitle entity entrance entry envelop envelope
environment environmental envy epidemic episode epoch equal equality equally equation
equip equipment equivalent era eradicate erase erect error erupt escape especially
essay essence essential essentially establish establishment estate esteem estimate
estimated eternal ethnic evaluate evaluation eve even evening event eventual eventually
ever every everybody everyday everyone everything everywhere evidence evident evil
evolution evolve exact exactly exaggerate exam examination examine examiner example
exceed excel excellence excellent except exception exceptional excess excessive
exchange excite excitement exclude exclusive excursion excuse execute execution
executive exempt exercise exert exhaust exhibit exhibition exist existence existing
expand expansion expect expectation expectantly expedite expel expenditure expense
expensive experience experiment experimental expert expertise expire explain explanation
explicit explode exploit exploration explore explorer explosion explosive export expose
exposition exposure express expression extend extension extensive extent exterior
external extra extract extraordinary extreme extremely eye
`;

const DICT_CHUNK_6 = `
fabric fabulous face facet facility facing fact factor factory factual faculty
fade fail failure faint fair fairly faith faithful fake fall false fame familiar
familiarity family famous fan fanatic fancy fantasy far fare farewell farm farmer
farming fascinate fascinating fashion fashionable fast fasten fat fatal fate father
faucet fault faulty favor favorable favorite fear fearful feasible feast feat feather
feature federal fee feeble feed feedback feel feeling fell fellow fellowship female
feminine fence feral ferment fertile festival fetch fever few fiber fiction field
fierce fight figure file fill film filter final finally finance financial finding
fine finger finish finite fire fireball firefighter fireplace firework firm firmness
firmly first fiscal fish fit fitness five fix fixture flag flame flare flash flask
flat flavor flaw flea fleet flesh flex flexibility flexible flick flight fling flip
float flock flood floor floral flourish flow flower fluid flush fly foam focal focus
fog foil fold folder folk follow following fond food fool foot football footing
footstep for forbid force forecast forehead foreign foreigner forest forever forge
forget forgive fork form formal format formation formulate forth fortress fortunate
fortune forward fossil foster foul found foundation founder fountain four fourteen
fourth fraction fracture fragile fragment frame framework fraud freak free freedom
freely freeway freeze freight frequency frequent frequently fresh friction friday
friend friendly friendship fright frighten frog from front frontier frost frown fruit
frustrate frustration fuel fulfill full fully fume fun function functional fund
fundamental funding funeral funny fur furious furnace furnish furniture furthermore
fury fuse fusion future
`;

const DICT_CHUNK_7 = `
gain galaxy gallery gamble game gang gap garage garbage garden gardener garlic
garment gas gasoline gasp gate gather gauge gaze gear gem gender gene general
generally generate generation generic generous genius genuine genuinely geography
geology geometry germ gesture get ghost giant gift gifted gigantic giggle girl
girlfriend give glad glance gland glare glass glaze glimpse global globalization globe
gloom gloomy glorious glory glove glow glue go goal goat god gold golden golf gone
good goodbye gorgeous govern government governor gown grab grace graceful grade
gradual gradually graduate grain gram grammar grand grandeur grandfather grandmother
grandson grant grape graph graphic graphics grasp grass gratitude grave gravel
gravity gray graze grease great greatly greed greedy greek green greenhouse greet
greeting grief grieve grim grin grind grip grocery gross ground group grow growth
guarantee guard guardian guess guest guidance guide guideline guilt guilty guitar
gulf gum gun gut guy gym
`;

const DICT_CHUNK_8 = `
habit habitat habitual hail hair haircut halfway hall hallway halt halve ham hammer
hand handbook handful handle handling handsome handmade handset hang happen happy
happiness harbor hard hardly hardware harm harmful harmless harmony harsh harvest
hat hatch hate hatred haul haunt have hazard haze he head headache heading headline
headquarters heal health healthy heap hear hearing heart heat heater heaven heavy
hedge heed heel height helicopter hell hello helmet help helpful helpless hem
hen hence herald herb herd here hero historic historical history hit hitch hive
hockey hold holder hole holiday hollow holy home homeless hometown honest honestly
honey honor hook hoop hope horizontal hormone horn horror horse hospital host
hostile hot hotel hound hour hourly house household hover how however huge human
humble humidity humor hundred hunger hungry hunt hunter hunting hurry hurt husband
hybrid hygiene hymn hyphen hypothesis
`;

const DICT_CHUNK_9 = `
ice icon ideal identical identify identity idiom idle ignore ill illegal illness
illuminate illusion illustrate illustration image imagery imagine imitate immediate
immense immerse immigrant impact impair impart impartial impasse impatient impeach
imperative imperial implement implicit imply import importance important impose
impossible impress impressive improve impulse in inability inadequate inbox incentive
incident incline include inclusive income incorporate incorrect increase incredible
indeed indent independent index indicate indigenous indirect individual industry
inevitable infant infect infer inferior infinite inflate influence inform informal
information ingredient initial initially initiate initiative inject injure inland
innate inner innocent innovate input inquire inquiry insane insert inside insight
insist inspect inspect inspire install instance instant instead institute instruct
instrument insult insure intact integer integrate integrity intelligence intend intense
intent interact intercept interest interface interior internal internet interpret
interrupt interval intervene interview into intricate intrigue introduce intro
intrude intuitive invade invalid invent inventory invest investigate investor invite
invoke invoice involve inward iron ironic irony irrigate irritate isolate isolation
issue it item itinerary itself
`;

const DICT_CHUNK_10 = `
jacket jail jam january jargon jaw jazz jealous jean jeep jelly jeopardy jet jewel
jewelry job jog join joint joke journal journalist journey joy judge judgment judicial
juice jump jungle junior junk jury justice justify
`;

const DICT_CHUNK_11 = `
keen keep keeper kettle key keyboard kick kid kidnap kidney kill killer kin kind
kindergarten king kingdom kiss kitchen kite kitten knee kneel knife knight knit
knob knock knot know knowledge knuckle
`;

const DICT_CHUNK_12 = `
label labor laboratory lace lack ladder ladle lady lake lamb lame lamp land landscape
lane language lap laptop large largely larva laser last late lately later lateral
latest launch laundry law lawful lawn lawsuit lawyer lay layer layout lazy lead
leader leadership leading leaf leaflet league leak lean leap learn learned lease
least leather leave lecture left legacy legal legend legitimate leisure lemon length
lens leopard lesson let letter level leverage levy liability liable liaison liberal
liberty library license lick lid lie lieutenant life lifetime lift light lighten
lighthouse lighting lightly lightning like likelihood likely likeness limit limitation
line lineage linear line linen linger link lion lip liquid list listen literal
literary literature live livelihood lively liver load loaf loan lobby local locality
locate location lock locker locomotive lodge log logic logical logbook lone lonely
long longitude look loop loose lord lose loss lost lot lottery loud lounge love
lovely lover low lower loyalty luck lucky lucrative luggage lump lunar lunch lung
luxury lyric
`;

const DICT_CHUNK_13 = `
machine machinery macro mad magazine magic magnet magnetic magnificent magnify
maid mail mailbox main mainland maintain maintenance major majority make maker
male malice mall mama mammal man manage management manager mandate manifest
mankind manner manual manufacture manufacturer many map maple marathon marble march
margin marine mark market marketing marketplace marriage married marry marsh marshal
mask mass massacre massage massive master masterpiece match mate material maternal
math mathematical matrix matter mature maturity maximum may maybe mayor maze me
meadow meal mean meaning meantime meanwhile measure measurement meat mechanical
mechanism medal media mediate medical medication medicine medieval mediocre meditate
medium meet meeting melody melt member membership membrane memo memorable memorize
memory men menace mend mental mentality mention mentor menu merchant mercy mere
merely merge merger merit mesh mess message metal metadata metaphor method
meticulous metric metro micro microphone microscope mid middle midnight midway
might migrate migration mild military milk mill millennium million mime mind mine
mineral minimal minimize minimum minister ministry minor minority mint minus minute
miracle mirror misbehave miserable misery mislead missile missing mission mistake
mix mixture moan mobile mobility mock mode model moderate modern modernize modest
modify modular module moist moisten moisture molecule mom moment momentary momentum
monday monetary money monitor monkey monopoly monster month monthly monument mood
moon moor moral morale morality more moreover morning mortgage mosquito moss most
mostly motel mother motion motivate motivation motor mould mount mountain mouse
mouth move movement movie much mud mug multi multiple multiply multitude murder
muscle museum mushroom music musical musician must mustard mute mutual my myself
mysterious mystery myth
`;

const DICT_CHUNK_14 = `
nail naked name namely nap napkin narrative narrow nasal nasty nation national
nationwide native natural naturally nature naval navigate navigation navy near
nearby nearly neat necessarily necessary necessity neck need needle negative neglect
negotiate negotiation neighbor neighborhood neither neon nephew nerve nervous nest
net network neutral never nevertheless new newborn newly news newspaper next nibble
nice niche nickname niece night nightmare nine nitrogen no noble nobody nod noise
noisy nomad nominate nomination nominee none nonetheless nonsense noon nor norm
normal normally north northern nose not notable notably notch note notebook notice
notion notorious noun nourish novel novelist novelty november now nowhere nuclear
null number numeric numerous nun nurse nursery nut nutrient nutrition nylon
`;

const DICT_CHUNK_15 = `
oak oar oasis oath obedient obey object objection objective obligation oblige
oblivious obscure observable observation observe observer obsess obsolete obstacle
obtain obvious obviously occasion occasional occasionally occupation occupy occur
occurrence ocean october odd odds odor of off offense offend offender offensive
offer offering office officer official officiate offset offspring often oh oil
okay old olive olympic omission omit on once one ongoing onion online onlooker
only onset onto open opening operate operation operator opinion opponent oppose
opposite opposition opt optic optimal optimist optimistic option oral orange orbit
orchestra order ordinary organ organic organize organizer origin original originally
ornament orphan other otherwise ought ounce our outdoors outer outfit outlaw outlet
outline outlook output outrage outset outside outspoken outstanding outward oval
oven over overall overcast overcome overdue overflow overlook overnight override
oversee overwhelm owe own owner oxygen oyster
`;

const DICT_CHUNK_16 = `
pace pack package packet pact pad paddle page paid pain painful paint painter
painting pair palace pale palm panel panic pant paper parachute parade paradise
paragraph parallel parallelize paramount parcel pardon parent parental parish park
parking parliament parole parrot part partial participant participate particle
particular particularly partner partnership party pass passage passenger passion
passive passport past paste pastry patch path pathetic patience patient patriot
patrol patron pattern pause pave pavement paw pay payable payment peace peaceful
peak peanut peasant peculiar pedal pedestrian peek peel peer penalty pencil pending
penetrate peninsula penny pension people pepper perceive percentage perception
perch perfect perfection perfectly perform performance perfume perhaps period
periodic perish permanent permission permit persist person personal personality
personally personnel perspective persuade pest pet petition petrol petroleum petty
phase phenomenon philosophy phone photo photograph photographer photography phrase
physical physics physiological piano pick pickup picnic picture picturesque piece
pier pig pigeon pile pilgrim pill pillar pillow pilot pin pinch pine pink pioneer
pipe pipeline pirate pistol pit pitch pitcher pivot pixel place placement plague
plain plan plane planet planned planner planning plant plaster plastic plate
platform play player playback plea plead pleasant please pleasure pledge plot
plow plug plum plumber plump plunge plural plus pneumonia pocket poem poet poetry
point pointer poison polar police policeman policy polish polite political politician
politics poll pollution polo poly polygon pond ponder pony pool poor pop popcorn
popular popularity populate population porcelain porch pork porous port portable
portal portion portrait position positive possess possession possibility possible
possibly post postage postal postcard poster postman posture pot potato potent
potential potion pottery pouch poultry pound pour poverty powder power powerful
practicable practical practice praise pray prayer preach pre precaution precede
precedent precision preclude predator predecessor predict prediction prefix pregnant
prejudice preliminary premier premise premium preparation prepare prescribe presence
present presentation preserve preside president press pressure presume pretend
pretty prevail prevent preview previous previously price pricing pride priest primary
prime primitive prince princess principal principle print priority prison privacy
private privilege prize pro probable probably probe problem procedure proceed
process proclaim produce product production professional professor profile profit
profound program programmer programming progress progressive project projectile
prolong prominent promise promote promotion prompt prone proof propel proper properly
property proportion proposal propose proposition protect protection protective
protein protest proud prove proverb provide provider province provision provisional
proxy prune psychology public publication publish publisher pudding pull pulpit
pulse pump pumpkin punch punish pupil puppet purchase pure purify purple purpose
pursue pursuit push put puzzle pyramid
`;

const DICT_CHUNK_17 = `
qualification qualify quality quantity quantum quarantine quarrel quarry quart
quarter quarterly quartz queen query quest question questionnaire quick quickly
quiet quietly quilt quit quite quote quotation
`;

const DICT_CHUNK_18 = `
rabbit race racial radar radiant radiate radiation radical radio radioactive
radish radius raft rag rage raid rail railroad railway rain rainbow raise rake
rally ranch random rank rapid rapidly rare rarely rash rate rather rating ratio
ration raw ray razor reach react reaction reactive read reader readily reading
ready real realistic reality realization realize really realm reap rear reason
reasonable reasonably reassure rebel rebuild recall receive receiver receiving
recent recently recipe recipient recognition recognize recoil recommend recommendation
reconcile record recover recovery recreate recruit rectangle rectify recur red
redeem redefine redo reduce reduction redundancy redundant reed reef refer referee
reference refill refine reflect reflection reform refresh refrigerator refund refuse
regard regardless regime region regional register regret regular regularly regulate
regulation reject relate relation relationship relative relatively relax relay
release relevance relevant reliable reliance relief relieve religion religious
rely remain remainder remains remark remarkable remedy remember remind reminder
remote removal remove renaissance render renew renounce renovate rent repair
repay repeat repeated repeatedly repel replace replacement reply report reporter
reprehensible represent representative repress reproduce republic repute reputation
request require requirement rescue research researcher resemble resent reserve
reservoir reset resident reside resign resignation resist resistance resolve resort
resource respect respectable respective responsibility responsible rest restaurant
restore restrain restrict restriction result resume retain retire retirement return
reunite reveal revelation revenge revenue reverse review revise revival revive
revolution revolutionary reward rhythm ribbon rib rice rich rid riddle ride rider
ridge ridicule rigid rigor ring riot rinse rip ripe ripple rise risk risky rite
ritual rival river road roam roar roast rob robot robust rock rocket rod rogue
roll roman romantic roof rookie room root rope rose roster rotate rotation rough
round route routine row royal rubber rub rude ruin rule ruler rumor run runner
rural rush russian rust rustic
`;

const DICT_CHUNK_19 = `
sack sacred sacrifice sad safe safeguard safely safety saga sage sail sailor saint
sake salad salary sale sales salient saliva salmon salon salt salute salvage same
sample sanctuary sand sandal sandwich sane sanity satellite satisfaction satisfy
saturate saturday sauce saucer sauna sausage savage save saving savings savor saw
say scale scan scandal scant scarce scarcely scare scarf scatter scenario scene
scenic scent schedule schema scheme scholar scholarship school science scientific
scientist scissor scope scorch score scorn scout scrap scrape scratch scream
screen screw script scroll scrutiny scuba sea seal search season seasonal seat
second secret secretary secretarial section sector secular secure security see seed
seek seem seemly segment seize select selection self sell seminar senate senator
send senior sense sensation sensible sensitive sensor sentiment sentence separate
separation september sequence sequel sequential serial series serious sermon serpent
serum servant serve service session set setting settle settlement setup seven
seventeen seventy several severe shadow shady shaft shake shallow shame shampoo
shape share shark sharp shatter shave shawl she shear shed sheep sheer sheet
shelf shell shelter shepherd shield shift shine ship shirt shock shoe shoot
shop shore short shortage shortly shot shoulder shout show shower shrimp shrine
shrink shrub shrug shut shutter shuttle shy sibling sick side sidewalk siege
sieve sigh sight sigma sign signal signature signpost silence silent silk silly
silver similar similarity simple simplify simply simulate simulation since sincere
sing singer single sink sip sir siren sister sit site situated situation six
sixteen sixty size skate sketch skew ski skill skilled skim skin skip skirt
skull sky slab slam slap slash slate slave sleek sleep sleeve slender slice
slide slight slim slime slip slipper slit slope slot slow slowly slug slum
slumber small smart smash smell smile smirk smoke smooth smother snack snail
snake snap sneeze sniff snore snow so soak soap soar soccer social socialism
society sock socket sofa soft software soil solar solder soldier sole solemn
solid solidarity solitary solo soluble solution solve solvent some somebody
somehow someone something sometimes somewhat somewhere son song sonic soon sore
sorrow sorry sort sought soul sound soup sour source south southern space spade
span spare spark sparkle sparrow spawn speak speaker spear special specialist
specialize species specific specifically specification specify specimen spectacle
spectrum speculate speech speed speedometer spell spelling spend spherical spice
spider spike spill spin spinach spiral spirit spiritual spit spite splash split
spoil spoke sponsor spontaneous spoon sport spot spouse spread spring sprinkler
sprout spur squad square squash squeeze squid stab stability stable stack stadium
staff stage stain stair stake stale stall stamp stand standard standardize standing
staple star starboard stare start starter startle startup starve state statement
static station stationary statistics statue status statute stay steady steak steal
steam steel steep steer stem step sterile stick stiff stifle stigma still stimulate
stimulus sting stink stir stitch stock stockpile stone stool stop storage store
storm story stout stove straight strain strange stranger strategy straw strawberry
stream street strength strengthen stress stretch strict strictly strike string
strip strive stroke strong structure struggle stubborn student studio study stuff
stumble stump stupid style subdue subject submarine submit subscriber subsequent
subsidy substance substantial substitute subtle subtract suburb suburban succeed
success successful succession successor sudden suddenly sue suffer sugar suggest
suggestion suicide suit suitable suite sulfate sulfur sum summary summer summit
summon sun sunday super superb superior supermarket supervise supervisor supper
supplement supply support supporter suppose supposed suppress supreme sure surety
surface surge surgery surplus surprise surprisingly surround surveillance survey
survival survive survivor suspend suspicion suspicious sustain swallow swamp swap
swarm sway swear sweat sweater swedish sweep sweet swell swim swimming swing
switch swirl switchboard swivel sword syllabus symbol symmetry sympathy symphony
symptom synopsis synthesize synthetic system systematic
`;

const DICT_CHUNK_20 = `
table tablet taboo tactic tactical tag tail tailor taint take talent talented
talk tall tame tandem tank tap tape target tariff task taste tasty tattoo taught
tax taxation taxi tea teach teacher teaching team teapot tear technical technique
technology teenager telecast telegram telegraph telemetry telephone telescope
television tell template tempo temporary tempt ten tenant tend tendency tender
tennis tense tension tent tentative tenth term terminal terminate terminology
terrace terrain terrible terrific territory terror terrorism terrorist test testify
testimony testing text textbook texture than thank thankful thanksgiving that
the theatre theatrical theft their them theme themselves then theology theoretical
theory therapy there thereby therefore thermal thesaurus these thesis they thick
thief thigh thin thing think thinker third thirst thirsty thirteen thirty this
thorn thorough thoroughly those though thought thoughtful thousand thread threat
threaten three threshold thrift thrill throat throne through throughout throw thrust
thumb thunder thursday ticket tick tide tidy tie tier tight tile timber time
timely timer timetable timid tin tiny tip tire tired tissue title to toad tobacco
today toe together toggle toggleable toilet token tolerance tolerate toll tomato
tomorrow tone tongue tonight tonsil tool toolbar toolbox tooth top topic torch
tornado torment torrent tortoise torture toss total totally touch tough tour
tourism tourist tournament toward towards towel tower toxic trace track traction
tractor trade trademark trader tradition traditional traffic trail train trainer
training trait transform transformation transient transit translate translation
transmission transmit transparent transport transportation trap trauma travel
tray treasure treaty tree tremble tremendous trench trend trial triangle tribute
trick trigger trim trip triple triumph trophy troop trophy trouble truck true
truly trumpet trunk trust trustee truth truthful try tube tuberculosis tuesday
tulip tuition tumbler tunnel turbine turf turn turnover turtle tutor twelve twenty
twice twin twist type typical typically typo typography
`;

const DICT_CHUNK_21 = `
ugly ultimate ultimately ultraviolet umbrella unable unaware unbearable uncanny
uncle unclear uncomfortable unconditional unconscious undefined under undergraduate
undergo underground underline underlying undermine underpass understand understanding
undertake underway undo undone undue uneasy unemployment unexpected unfair
unfamiliar unforgiving unfortunate ungrateful unicorn unified uniform unify
unimportant union unique unit unite universal universe university unjust unkind
unknown unless unlike unlikely unlimited unload unlock unmarried unmatched
unmistakable unnecessary unoccupied unofficial unpack unpleasant unpopular
unprecedented unpredictable unprepared unpublished unreal unreasonable unrelated
unresolved unrest unroll unsafe unseen unselfish unsteady unsuccessful unsuitable
untidy untie until untimely unto unusual unusually unwrap unyielding update upgrade
uphold upon upper upright uprising uproar upset upstairs upward urban urge urgency
urgent us usage use useful user usual usually utilize utility utter utterly
`;

const DICT_CHUNK_22 = `
vacant vacation vacuum vague vain valid validate validity valley valuable value
van vanish vapor variable variation variety various vary vascular vast vault
vector vegetable vehicle velocity velvet vendor venture verbal verify verification
versatile version versus vertical verticality vessel veteran veto viable vibrant
vibrate vibration vice vicious victim victory video view viewer viewpoint vigorous
villa village villain vine vinegar vintage violate violation violence violent
violet violin virtual virtually virtue virulent virus visa visible vision visit
visitor visual visualize vital vitality vitamin vivid vocabulary vocal vocation
voice void volatile volcano volleyball volume voluntary volunteer vote voter
vow voyage vulgar vulnerability vulnerable
`;

const DICT_CHUNK_23 = `
wade wage wagon waist wait waiter waitress waive wake walk walker walking wall
wallet wallpaper walnut wander want war warehouse warfare warm warmth warn
warning warrant warrior wash washing waste watch watchdog water waterproof wave
waver wax way we weak weaken wealth wealthy weapon wear weary weather weave
web webinar website wed wedding wednesday weed week weekend weekly weep weigh
weight welcome welfare well west western wet whale what whatever wheat wheel
wheelchair when whenever where whereas whereby wherever whether which while
whilst whim whip whisper whistle white who whole wholesale wholesome whom whose
why wick wide widely widen widespread widow width wife wild wilderness wildlife
will willing willingly win wind window windshield windy wine wing wink winner
winter wipe wire wisdom wise wish wit with withdraw withdrawal wither within
without witness wizard wobble wolf woman womb wonder wonderful wood woodland
wool word wording workforce work working workout works world worldwide worm
worry worse worship worst worth worthy would wound wrap wrapper wreck wrinkle
wrist write writer writing written wrong wrongdoing
`;

const DICT_CHUNK_24 = `
xenon yacht yard yawn yeah year yearly yearn yeast yell yellow yesterday yield
yoga yogurt yoke yolk you young youngster your yours yourself youth zero zone zoo
zoom
`;

export const COMMON_DICTIONARY_WORDS = [
  ...TOP_CORE_WORDS.trim().split(/\s+/),
  ...DICT_CHUNK_1.trim().split(/\s+/),
  ...DICT_CHUNK_2.trim().split(/\s+/),
  ...DICT_CHUNK_3.trim().split(/\s+/),
  ...DICT_CHUNK_4.trim().split(/\s+/),
  ...DICT_CHUNK_5.trim().split(/\s+/),
  ...DICT_CHUNK_6.trim().split(/\s+/),
  ...DICT_CHUNK_7.trim().split(/\s+/),
  ...DICT_CHUNK_8.trim().split(/\s+/),
  ...DICT_CHUNK_9.trim().split(/\s+/),
  ...DICT_CHUNK_10.trim().split(/\s+/),
  ...DICT_CHUNK_11.trim().split(/\s+/),
  ...DICT_CHUNK_12.trim().split(/\s+/),
  ...DICT_CHUNK_13.trim().split(/\s+/),
  ...DICT_CHUNK_14.trim().split(/\s+/),
  ...DICT_CHUNK_15.trim().split(/\s+/),
  ...DICT_CHUNK_16.trim().split(/\s+/),
  ...DICT_CHUNK_17.trim().split(/\s+/),
  ...DICT_CHUNK_18.trim().split(/\s+/),
  ...DICT_CHUNK_19.trim().split(/\s+/),
  ...DICT_CHUNK_20.trim().split(/\s+/),
  ...DICT_CHUNK_21.trim().split(/\s+/),
  ...DICT_CHUNK_22.trim().split(/\s+/),
  ...DICT_CHUNK_23.trim().split(/\s+/),
  ...DICT_CHUNK_24.trim().split(/\s+/),
];
