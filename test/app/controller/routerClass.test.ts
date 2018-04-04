'use strict'

import { app } from 'egg-mock/bootstrap'
import { Blueprint, bp } from '../../../lib'
import * as assert from 'assert'
import TestController from '../../../app/controller/test'

describe('test/app/controller/rest.test.ts', () => {
    it('scan dir not fail', async () => {
        Blueprint(app)
    })

    it('url mapping correctly', async () => {
        Blueprint(app)
        const URI = {
            '/get': true,
            '/post': true,
            '/put': true,
            '/rest': true,
            '/del': true,
            '/foo/:bar': true,
            '/need/auth/:password': true
        }
        Object.keys(bp.getRoute()).forEach(key => {
            assert(URI[key] === true)
        })
    })

    it('dupplicate setRouter should fail', async () => {
        Blueprint(app)
        try {
            bp.setRouter('/custom', {
                httpMethod: 'get',
                constructor: TestController,
                handler: 'index'
            })
            bp.setRouter('/custom', {
                httpMethod: 'get',
                constructor: TestController,
                handler: 'index'
            })
        } catch (e) {
            assert(e.message === 'URL * GET /custom * existed')
        }
    })

    it('same url with diff METHOD', async () => {
        Blueprint(app)
        bp.setRouter('/diff', {
            httpMethod: 'get',
            constructor: TestController,
            handler: 'index'
        })
        bp.setRouter('/diff', {
            httpMethod: 'post',
            constructor: TestController,
            handler: 'index'
        })
    })

    it('scanController not fail', async () => {
        Blueprint(app)
        bp.scanController()
    })
})
