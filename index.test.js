const { sequelize } = require('./db');
const { Band, Musician, Song } = require('./index')

describe('One-to-Many Associations', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        Band.create({
            name: "The Band"
        })
        const allBands = Band.findAll()
        expect(allBands).not.toBeNull()
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        Musician.create({
            name: "John Does"
        })
        const allMusicians = Musician.findAll()
        expect(allMusicians).not.toBeNull()
    })

    test('can add Band <> Musician association', async () => {
        // TODO - test creating a band
        const bandToAdd = await Band.findByPk(1)
        const musicianToAdd = await Musician.findByPk(1)
        bandToAdd.addMusician(musicianToAdd)
        
        const bandWithMusician = await Band.findOne({
            where: { id: 1},
            include: Musician,
        });
        expect(bandWithMusician.Musicians.length).toBe(1)
    })

    test('can add multiple musicians to a band', async () => {
        // TODO - test creating a band
        const bandToAdd = await Band.findByPk(1)
        
        await Musician.bulkCreate([
            {
                name: "Musician 1"
            },
            {
                name: "Musician 2"
            },
            {
                name: "Musician 3"
            },
        ])
        await bandToAdd.setMusicians([])
        const musiciansToAdd = await Musician.findAll()

        await bandToAdd.addMusicians(musiciansToAdd)
        
        const bandWithMusician = await Band.findOne({
            where: { id: 1 },
            include: Musician,
        });
        expect(bandWithMusician.Musicians.length).toBe(4)
    })
})

describe('Many-to-Many Associations', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Song', async () => {
        // TODO - test creating a band
        const song = await Song.create({
            name: "Fly"
        })
        expect(song).toMatchObject({
            name: "Fly"
        })
    })

    test('can add multiple songs to a band', async () => {
        // TODO - test creating a band
        const createdBand = await Band.create({
            name: "The Band"
        })
        const createdBand2 = await Band.create({
            name: "The Second Band"
        })
        
        const song = await Song.findByPk(1)
        const song2 = await Song.create({
            name: "Drive"
        })

        await createdBand.addSongs([song, song2])

        const bandWithSongs = await Band.findOne({
            where: {id: 1},
            include: Song
        })

        bandSongs = await bandWithSongs.getSongs()
        expect(bandSongs.length).toBe(2)

    })

    

})