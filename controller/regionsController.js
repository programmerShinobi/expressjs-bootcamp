import { sequelize } from "../models/init-models";

const findAllRegions = async (req, res) => {
    const result = await sequelize.query('SELECT * FROM regions', {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.regions,
        mapToModel: true
    });
    return res.send(result);
}

const findAllRegionsRows = async (req, res) => {
    const result = await req.context.models.regions.findAll();
    return res.send(result);
}

const findRegionRowsById = async (req, res) => {
    const result = await req.context.models.regions.findByPk(req.params.id, {
        attributes: ['region_id', 'region_name']
    });
    return res.send(result);
}

const CreateRegions = async (req, res) => {
    const result = await req.context.models.regions.create({
        region_id: req.body.region_id,
        region_name: req.body.region_name
    })
    return res.send(result);
}

const UpdateRegions = async (req, res) => {
    const result = await req.context.models.regions.update({
        region_name: req.body.region_name
    }, {
        returning: true,
        where: { region_id: req.params.id }
    });

    return res.send(result);
}

const DeleteRegions = async (req, res) => {
    const id = req.params.id;

    await req.context.models.regions.destroy({
        where: { region_id: id }
    });

    return res.send(id);
}


const regionJoinCountries = async (req, res) => {
    const result = await req.context.models.regions.findAll({
        include: [{
            model: req.context.models.countries,
            as: "countries"
        }]
    });

    return res.send(result);
}

export default {
    findAllRegions,
    findAllRegionsRows,
    CreateRegions,
    UpdateRegions,
    findRegionRowsById,
    DeleteRegions,
    regionJoinCountries
}